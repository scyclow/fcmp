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
  validateUser(username, password, cb) {
    let user;
    return this.findOne({ username })
      .then(_user => {
        if (!_user) {
          cb(null, false);
          throw new Error(`User with username: ${username} does not exist.`)
        }

        user = _user;
        return user.passwordValid(password);
      })
      .then(isValid => {
        cb(null, user, isValid);
        return { user, isValid };
      });
  },

  validateUserByEmail(email, password) {
    return this.findOne({ email }).then(user => {
      if (!user) throw new Error(`User with email: ${email} does not exist.`);

      return user.passwordValid(password).then(isValid => {
        if (!isValid) throw new Error('Password is invalid.');
        return user;
      });
    });
  }
}

// async validateUserByEmail(email, password, cb) {
//   const user = await this.findOne({ email });
//   if (!user) {
//     cb(null, false);
//     throw new Error(`User with email: ${email} does not exist.`)
//   }

//   const isValid = await user.passwordValid(password);

//   cb(null, user, isValid);
//   return { user, isValid };
// }

// function promisify(fn) {
//   return (...args) => new Promise((resolve, reject) => {
//     fn(...args, (err, ...payload) => {
//       if (err) reject(err);
//       else resolve(...payload);
//     });
//   });
// }

const User = mongoose.model('User', UserSchema);

module.exports = User;
