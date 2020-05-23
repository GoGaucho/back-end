/*
* [controllers/api] info
* - handles for info
* @{export} GetOne
* @{export} GetAll
* @{export} Put
* @{export} Delete
*/

"use strict";

const info = require("../../services/info");

exports.GetOne = async function(req, resp) {
  let key = req.params.key;
  let res = await info.Query(key);
  if (!res) resp.status(404).send("Not found");
  else resp.send(res);
}

exports.GetAll = async function(req, resp) {
  let res = await info.All();
  resp.send(res);
}

exports.Put = async function(req, resp) {
  let key = req.params.key;
  let data = req.body.data;
  if (!data) {
    resp.status(400).send("Params Err, data required");
    return;
  }
  let res = await info.Upsert(key, data);
  if (res) resp.send("Success");
  else resp.status(500).send("Fail");
}

exports.Delete = async function(req, resp) {
  let res = await info.Delete(req.params.key);
  if (res) resp.send("Success");
  else resp.status(500).send("Fail");
}