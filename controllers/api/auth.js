/*
* [controllers/api] auth
* - middlewares for auth
* @{export} Auth
*/

"use strict";

const token = require("../../utils/token");

exports.UserAuth = function(req, resp, next) {
  let t = req.get("token");
  let u = token.Check(t);
  if (!u) {
    resp.status(403).send("Forbidden");
  }
  req.user = u;
  next();
}