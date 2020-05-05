/*
* [utils] Token
* - @{export} Create
* - @{export} Check
*/

"use strict";

const SALT = String(Math.random());

const crypto = require("./crypto");
const time = require("./time");

// generate a new token
exports.Create = function(id, life = 604800) {
  let timestamp = String(time.Timestamp(life));
  let signature = crypto.Hash(id + timestamp, SALT);
  return id + "." + timestamp + "." + signature;
}

// verify a token
exports.Check = function(token) {
  const t = token.split(".");
  // check format
  if (!t[0] || !t[1] || !t[2]) return false;
  // check time
  if (Number(t[1]) < time.Timestamp()) return false;
  // check signature
  if (crypto.Hash(t[0] + t[1], SALT) != t[2]) return false;
  // valid
  return t[0];
}