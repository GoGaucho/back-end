/*
* [controllers/api] auth
* - middlewares for auth
* @{export} Auth
*/

"use strict";

const crypto = require("../../utils/crypto");
const time = require("../../utils/time");

exports.Auth = function(req, resp, next) {
  let timestamp = req.get("timestamp");
  let signature = req.get("signature");
  if (isNaN(timestamp) || !signature) {
    resp.status(401).send("Unauthorized");
    return;
  }
  if (Number(timestamp) + 30 < time.Timestamp()) {
    resp.status(408).send("Request Timeout");
    return;
  }
  if (crypto.Hash(timestamp) != signature) {
    resp.status(403).send("Forbidden");
    return;
  }
  next();
}