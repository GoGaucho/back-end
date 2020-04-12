/*
* [controllers/api] waitz
* - handles for waitz
* @{export} Waitz
*/

"use strict";

const waitz = require("../../services/waitz");

exports.Waitz = async function(req, resp) {
  let res = await waitz.Waitz();
  if (!res) resp.status(404).send("Waitz data not found");
  else resp.send(res);
}