/*
* [controllers/api] waitz
* - handles for waitz
* @{export} Waitz
*/

"use strict";

const daos = require("../../daos");

exports.Waitz = async function(req, resp) {
  let res = await daos(`waitz.Waitz()`);
  resp.send(res);
}