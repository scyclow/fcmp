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

  async makeFastCash (amount, ignoreComission) {
    const updateBalance = async () => {
      this.fastCashBalance += Number(amount);
      return this.save();
    };

    const updateParent = async () => {
      if (!ignoreComission) {
        const parent = await this.getParent();
        if (parent) return parent.makeFastCash(amount * this.parentBonus);
      }
    };

    await Promise.all([
      updateBalance(),
      updateParent()
    ]);

    return this;
  },

  getParent () {
    return this.model('User').findOne({ _id: this.parent });
  },

  getChildren (populate) {
    const query = this.model('User').findOne({ parent: this._id });
    return populate ? query : query.select('_id');
  },

  async transfer(account, amount) {
    if (this.fastCashBalance < amount) throw new Error(
      `${this.username} does not have enough fastcash for this tansaction`
    );

    const payee = await this.model('User').findByAccountCode(account);

    await Promise.all([
      payee.makeFastCash(amount, true),
      this.makeFastCash(-amount, true)
    ]);

    return {
      payer: _.pick(this, ['username', 'fastCashBalance']),
      payee: _.pick(payee, ['username', 'fastCashBalance']),
    };
  }
};

UserSchema.statics = {
  async validateUser(identifier, password) {
    const user = await this.findOne(identifier);
    if (!user) throw new Error(`User with ${JSON.stringify(identifier)} does not exist.`);

    const isValid = await user.passwordValid(password);
    if (!isValid) throw new Error('Password is invalid.');

    return user;
  },

  async findByToken(decoded) {
    const user = await this.findOne(decoded._doc);
    if (!user) throw new Error(`User does not exist: ${decoded._doc}`);

    return user;
  },

  findByAccountCode(accountCode) {
    return this.findOne({ accountCode });
  }
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
