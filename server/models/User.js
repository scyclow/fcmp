const mongoose = require('mongoose');
const _ = require('lodash');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const verification = require('../utils/verification');
const { createAddress } = require('../utils/createAddress');

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  pin: {
    type: String,
    required: true
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

UserSchema.pre('save', function updatePin (next) {
  if (!this.isModified('pin')) return next();

  verification.encrypt(this.pin)
    .then(hash => {
      this.pin = hash;
      next();
    })
    .catch(next)
});

UserSchema.methods = {
  pinValid (pin) {
    return verification.validate(pin, this.pin);
  },

  async makeFastCash (amount, ignoreComission) {
    const updateBalance = async () => {
      this.balance += Number(amount);
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
    if (this.balance < amount) throw new Error(
      `${this.address} does not have enough fastcash for this tansaction`
    );

    const payee = await this.model('User').findByAddress(account);

    await Promise.all([
      payee.makeFastCash(amount, true),
      this.makeFastCash(-amount, true)
    ]);

    return {
      payer: _.pick(this, ['address', 'balance']),
      payee: _.pick(payee, ['address', 'balance']),
    };
  }
};

UserSchema.statics = {
  async validateUser(identifier, pin) {
    if (!pin) throw new Error('pin is required');

    const user = await this.findOne(identifier);
    if (!user) throw new Error(`User with ${JSON.stringify(identifier)} does not exist.`);

    const isValid = await user.pinValid(pin);
    if (!isValid) throw new Error('pin is invalid.');

    return user;
  },

  async findByToken(token) {
    const decrypted = await verification.verifyJWT(token);
    const address = decrypted.address;
    if (!address) throw new Error(`Address does not exist for: ${JSON.stringify(decrypted)}`);

    const user = await this.findOne({ address });
    if (!user) throw new Error(`User does not exist: ${JSON.stringify(address)}`);

    return user;
  },

  async findByAddress(address) {
    const user = await this.findOne({ address });
    if (!user) throw new Error(`Cannot find user with address: ${address}`);

    return user;
  }
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
