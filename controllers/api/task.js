/*
* [controllers/api] task
* - handles for task (for admin)
* @{export} GetOne
* @{export} GetAll
* @{export} Put
* @{export} Delete
*/

"use strict";

const task = require("../../services/task");

exports.GetOne = async function(req, resp) {
  let key = req.params.key;
  let res = await task.Query(key);
  if (!res) resp.status(404).send("Not found");
  else resp.send(res);
}

exports.GetAll = async function(req, resp) {
  let res = await task.All();
  resp.send(res);
}

exports.Put = async function(req, resp) {
  let key = req.params.key;
  let data = req.body.data;
  if (!data) {
    resp.status(400).send("Params Err, data required");
    return;
  }
  let res = await task.Upsert(key, data);
  if (res) resp.send("Success");
  else resp.status(500).send("Fail");
}

exports.Delete = async function(req, resp) {
  let res = await task.Delete(req.params.key);
  if (res) resp.send("Success");
  else resp.status(500).send("Fail");
}