/*
* [utils] Crypto
* - @{export} HASH
*/

"use strict";

const crypto = require('crypto');

// Universal Hash function
// HASH(msg, salt) = MD5(SHA256(msg + salt) + salt)
exports.HASH = function(msg, salt = "") {
  let sha256 = crypto.createHash("sha256").update(msg + salt).digest("hex");
  let md5 = crypto.createHash("md5").update(sha256 + salt).digest("hex");
  return md5;
}