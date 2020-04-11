/*
* [controllers/api] dining
* - handles for dining
* @{export} Hours
*/

"use strict";

const daos = require("../../daos");
const time = require("../../utils/time");

exports.Hours = async function(req, resp) {
  let date = req.query.date;
  if (!date) date = time.Date();
  let res = await daos(`dining.Hours("${date}")`);
  resp.send(res);
}

exports.Menus = async function(req, resp) {
  let date = req.query.date;
  if (!date) date = time.Date();
  let dc = req.query.dc;
  if (!dc) resp.status(400).send("Params Err: dc required");
  let res = await daos(`dining.Menus("${dc}", "${date}")`);
  resp.send(res);
}