const crypto = require('crypto');

function generateSecretKey(length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

const secret = generateSecretKey(32);
console.log(secret);
