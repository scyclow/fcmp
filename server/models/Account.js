const mongoose = require('mongoose');
const _ = require('lodash');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const verification = require('../utils/verification');
const { createAddress } = require('../utils/createAddress');

const AccountSchema = new Schema({
  owner: {
    type: ObjectId,
    ref: 'User',
  },
  address: {
    type: String,
    default: createAddress,
    unique: true,
    index: true
  },
  balance: {
    type: Number,
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

AccountSchema.methods = {
  async updateBalance(amount)  {
    this.balance += Number(amount);
    return this.save();
  },

  async createToken() {
    return verification.signJWT({
      address: this.address,
      _id: this._id
    });
  },

  async transfer(payeeAddress, amount) {
    if (this.balance < amount) throw new Error(
      `${this.address} does not have enough fastcash for this tansaction`
    );

    const payee = await this.model('Account').findByAddress(payeeAddress);
    if (!payee) throw new Error(`Payee with address ${payeeAddress} does not exist`);

    await Promise.all([
      payee.updateBalance(amount),
      this.updateBalance(-amount)
    ]);

    return {
      payer: _.pick(this, ['address', 'balance']),
      payee: _.pick(payee, ['address', 'balance']),
    };
  }
};

AccountSchema.statics = {
  async findByToken(token) {
    const { address } = await verification.verifyJWT(token);
    return this.findByAddress(address);
  },

  async findByAddress(address) {
    return this.findOne({ address });
  }
}

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;
