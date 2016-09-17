const mongoose = require('mongoose');
const { createAccountCode } = require('../utils/createAccountCode');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  // password: String,
  accountCode: {
    type: String,
    default: createAccountCode()
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

userSchema.methods.makeFastCash = function(amount, cb) {
  this.fastCashBalance += amount;
  return this.save(cb);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
