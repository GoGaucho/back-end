/*
* [controllers/api] dining
* - handles for dining
* @{export} Hours
* @{export} Menus
*/

"use strict";

const dining = require("../../services/dining");
const time = require("../../utils/time");

exports.Hours = async function(req, resp) {
  let date = req.query.date;
  if (!date) date = time.Date();
  let res = await dining.Hours(date);
  if (!res) resp.status(404).send("Hours not found");
  else resp.send(res);
}

exports.Menus = async function(req, resp) {
  let date = req.query.date;
  if (!date) date = time.Date();
  let dc = req.query.dc;
  if (!dc) resp.status(400).send("Params Err: dc required");
  let res = await dining.Menus(dc, date);
  if (!res) resp.status(404).send("Menus not found");
  else resp.send(res);
}