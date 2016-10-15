const mongoose = require('mongoose');
const _ = require('lodash');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const { encryptPassword, validatePassword } = require('../utils/verification');
const { createAccountCode } = require('../utils/createAccountCode');

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  accountCode: {
    type: String,
    default: createAccountCode,
    unique: true,
    index: true
  },
  fastCashBalance: {
    type: Number,
    default: 1
  },
  parent: {
    type: ObjectId,
    ref: 'User'
  },
  parentBonus: {
    type: Number,
    default: 0.3
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  encryptPassword(this.password)
    .then(hash => {
      this.password = hash;
      next();
    })
    .catch(next)
});

UserSchema.methods = {
  passwordValid (password) {
    return validatePassword(this, password);
  },

  makeFastCash (amount, ignoreComission) {
    this.fastCashBalance += Number(amount);

    return this.save()
      // Pay tribute to thy parent
      .then(() => !ignoreComission && this.getParent())
      .then(parent => parent && parent.makeFastCash(amount * this.parentBonus))
      .then(() => this);
  },

  getParent () {
    return this.model('User').findOne({ _id: this.parent });
  },

  getChildren (populate) {
    const query = this.model('User').findOne({ parent: this._id });
    return populate ? query : query.select('_id');
  },

  transfer(account, amount) {
    if (this.fastCashBalance < amount) return Promise.reject(new Error(
      `${this.username} does not have enough fastcash for this tansaction`
    ));

    return this.model('User')
      .findByAccountCode(account)
      .then(payee => payee.makeFastCash(amount, true)
        .then(() => this.makeFastCash(-amount, true))
        .then(() => ({
          payer: _.pick(this, ['username', 'fastCashBalance']),
          payee: _.pick(payee, ['username', 'fastCashBalance']),
        }))
      );
  }
};

UserSchema.statics = {
  validateUser(identifier, password) {
    return this.findOne(identifier).then(user => {
      if (!user) throw new Error(`User with ${JSON.stringify(identifier)} does not exist.`);

      return user.passwordValid(password).then(isValid => {
        if (!isValid) throw new Error('Password is invalid.');
        return user;
      });
    });
  },

  findByToken(decoded) {
    return this.findOne(decoded._doc).then(user => {
      if (!user) throw new Error(`User no longer exists: ${decoded._doc}`);
      else return user;
    })
  },

  findByAccountCode(accountCode) {
    return this.findOne({ accountCode });
  }
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
