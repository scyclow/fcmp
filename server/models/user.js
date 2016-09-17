const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { createAccountCode } = require('../utils/createAccountCode');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

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
    unique: true
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

UserSchema.pre('save', encryptPassword);

UserSchema.methods = {
  passwordValid (_password, cb) {
    bcrypt.compare(_password, this.password, (err, isMatch) => {
      if (err) return next(err);
      cb(null, isMatch);
    });
  },

  makeFastCash (amount, cb) {
    this.fastCashBalance += amount;
    return this.save(cb);
  },
});

UserSchema.statics = {
  validateUser(username, password, cb) {
    this.findOne({ username }, (err, user) => {
      if (err) return cb(err);
      if (!user) return cb(null, false)

      user.passwordValid(password, (err, isValid) => {
        if (err) return cb(err);
        cb(null, user, isValid);
      });
    });
  }
}

const User = mongoose.model('User', UserSchema);

module.exports = User;


function encryptPassword(next) {
  if (!this.isModified('password')) return next();

  const saltRounds = 10;
  bcrypt.hash(this.password, saltRounds, (err, hash) => {
    if (err) return next(err);

    this.password = hash;
    next();
  });
}
