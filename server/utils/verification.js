const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../../config/env');

function encryptPassword(password) {
  return new Promise((resolve, reject) => {
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) reject(err);
      else resolve(hash);
    });
  });
}

function validatePassword(user, _password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(_password, user.password, (err, isMatch) => {
      if (err) reject(err)
      else resolve(isMatch);
    });
  });
}

function signJWT(user) {
  return new Promise((resolve, reject) => {
    jwt.sign(user, SECRET, {}, (err, token) => {
      if (err) reject(new Error('JWT not created'));
      else resolve(token);
    });
  });
}

function verifyJWT(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) reject(new Error('Failed to authenticate token.'));
      else resolve(decoded);
    });
  });
}

module.exports = { verifyJWT, signJWT, encryptPassword, validatePassword };
