/*
* [controllers/api] waitz
* - handles for waitz
* @{export} Waitz
*/

"use strict";

const waitz = require("../../services/waitz");

exports.Waitz = async function(req, resp) {
  let res = await waitz.Waitz();
  resp.send(res);
}