/*
* [controllers/api] auth
* - middlewares for auth
* @{export} UserAuth
* @{export} AdminAuth
*/

"use strict";

const token = require("../../utils/token");
const user = require("../../services/user");

exports.UserAuth = function(req, resp, next) {
  let t = req.get("token");
  let u = token.Check(t);
  if (!u) {
    resp.status(403).send("Forbidden");
    return;
  }
  req.user = u;
  next();
}

exports.AdminAuth = async function(req, resp, next) {
  let t = req.get("token");
  let u = token.Check(t);
  if (!u) {
    resp.status(403).send("Forbidden");
    return;
  }
  let usr = await user.Identity("_id", u);
  if (!usr || !usr.admin) {
    resp.status(403).send("Permission Denied.");
    return;
  }
  req.user = u;
  next();
}