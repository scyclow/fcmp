const mongoose = require('mongoose');
const _ = require('lodash');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const verification = require('../utils/verification');


const TransferSchema = new Schema({
  payer: {
    type: ObjectId,
    ref: 'Account',
    required: true
  },
  payee: {
    type: ObjectId,
    ref: 'Account',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'PENDING',
    enum: ['PENDING', 'PROCESSING', 'FULFILLED']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  executedAt: Date
});

TransferSchema.statics = {
  async register({ payer, payee, amount }) {
    const Account = this.model('Account');

    const [payerDoc, payeeDoc] = await Promise.all([
      Account.findByAddress(payer),
      Account.findByAddress(payee)
    ]);

    const transfer = await Transfer.create({
      amount,
      status: 'PENDING',
      payer: payerDoc._id,
      payee: payeeDoc._id,
    });

    const output = _.assign(
      { payer, payee },
      _.pick(transfer._doc, ['_id', 'status', 'createdAt', 'amount'])
    );

    return output;
  }
}


TransferSchema.methods = {
  async verifyTransfer(token) {
    const { _id } = await verification.verifyJWT(token);
    return _id === this.payer;
  },

  async execute(token) {
    // Prevent other calls from executing transfer
    if (_.includes(['PENDING', 'FULFILLED'], this.status)) {
      this.status = 'PROCESSING';
      await this.save();
    }
    else {
      throw new Error(`Transfer in progress.`);
    }


    // Check if authorized
    if (!this.verifyTransfer(token)) throw new Error(`Payment is not authorized.`)

    // Check that transfer is valid.
    const transferProps = this.populate('payer').populate('payee').execPopulate();
    const { payer, payee, amount } = await transferProps;

    if (!payee) throw new Error(`Payee address ${payee.address} does not exist.`);
    if (!payer) throw new Error(`Payer address ${payer.address} does not exist.`);
    if (payer.balance < amount) {
      throw new Error(`${payer.address} does not have enough fastcash for this transaction`);
    }


    // Attempt to make transfer
    await payer.updateBalance(-amount);
    try {
      await payee.updateBalance(amount);
    }
    catch (error) {
      // Undo payment if error receiving
      await payer.updateBalance(amount);
      throw new Error(`${payee.address} not updated. ` + error.message);
    }

    // Mark as fulfilled
    const executedAt = new Date();
    const status = 'FULFILLED';
    this.status = status;
    this.executedAt = executedAt;
    await this.save();

    return {
      status,
      executedAt,
      amount,
      payer: _.pick(payer, ['address', 'balance']),
      payee: _.pick(payee, ['address', 'balance']),
    };
  }
};

const Transfer = mongoose.model('Transfer', TransferSchema);

module.exports = Transfer;
