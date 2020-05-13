/*
* [controllers/api] user
* - handles for user
* @{export} Login
* @{export} Bind
*/

"use strict"

const user = require("../../services/user");

exports.Login = async function (req, resp) {
  let code = req.body.code;
  if (!code) {
    resp.status(400).send("Params Error, code required");
    return;
  }
  let res = await user.Login(code);
  if (!res) {
    resp.status(403).send("OAuth Login Failed.");
    return;
  }
  resp.send(res);
}

exports.Bind = async function (req, resp) {
  let res = await user.Bind(req.user, req.params.random);
  if (res) resp.send("success");
  else resp.status(400).send("fail");
}