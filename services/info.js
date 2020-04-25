/*
* [services] info
* - info services
* @{export} Query
*/

"use strict";

const info = require("../models/info");

exports.Query = async function(key) {
  let res = await info.Find({_id: key});
  if (!res.length) return false;
  else return res[0];
}