/*
* [controllers/api] student
* - handles for student
* @{export} Schedule
* @{export} Registration
*/

"use strict"

const user = require("../../services/user");
const student = require("../../services/student");

exports.Schedule = async function (req, resp) {
  let jwt = await user.Refresh(req.user);
  if (!jwt) {
    resp.status(401).send("Sorry, maybe you need to Login again.");
    return;
  }
  let res = await student.Schedule(jwt);
  if (!res) resp.status(500).send("Error");
  else resp.send(res);
}

exports.Registration = async function (req, resp) {
  let jwt = await user.Refresh(req.user);
  if (!jwt) {
    resp.status(401).send("Sorry, maybe you need to Login again.");
    return;
  }
  let res = await student.Registration(jwt);
  if (!res) resp.status(500).send("Error");
  else resp.send(res);
}
