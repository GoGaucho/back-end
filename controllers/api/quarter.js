/*
* [controllers/api] quarter
* - handles for quarter
* @{export} Current
* @{export} Quarter
*/

"use strict";

const quarter = require("../../services/quarter");

exports.Current = async function(req, resp) {
  const res = await quarter.Current();
  if (!res) resp.status(404).send("Not Found");
  else resp.send(res);
}

exports.Quarter = async function(req, resp) {
  const q = req.params.q;
  const res = await quarter.Quarter(q);
  if (!res) resp.status(404).send("Not Found");
  else resp.send(res);
}