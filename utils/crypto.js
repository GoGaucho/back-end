/*
* [utils] Crypto
* - @{export} HASH
*/

"use strict";

const crypto = require('crypto');

// Universal Hash function
// Hash(msg, salt) = MD5(SHA256(msg + salt) + salt)
exports.Hash = function(msg, salt = "") {
  let sha256 = crypto.createHash("sha256").update(msg + salt).digest("hex");
  let md5 = crypto.createHash("md5").update(sha256 + salt).digest("hex");
  return md5;
}

// MD5 function for hash
exports.MD5 = function(msg, salt = "") {
  return crypto.createHash("md5").update(msg + salt).digest("hex");
}