const mongoose = require('mongoose');
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
  children: [{
    type: ObjectId,
    ref: 'User'
  }],
  parent: {
    type: ObjectId,
    ref: 'User'
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

  makeFastCash (amount, cb) {
    this.fastCashBalance += amount;
    return this.save(cb);
  },
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
