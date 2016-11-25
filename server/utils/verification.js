const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../../config/env');

function encrypt(data) {
  return new Promise((resolve, reject) => {
    const saltRounds = 10;
    bcrypt.hash(data, saltRounds, (err, hash) => {
      if (err) reject(err);
      else resolve(hash);
    });
  });
}

function validate(decrypted, encrypted) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(decrypted, encrypted, (err, isMatch) => {
      if (err) reject(err)
      else resolve(isMatch);
    });
  });
}

function signJWT(data) {
  return new Promise((resolve, reject) => {
    jwt.sign(data, SECRET, {}, (err, token) => {
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

module.exports = { verifyJWT, signJWT, encrypt, validate };
