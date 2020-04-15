/*
* [services] course
* - course services
* @{export} Query
*/

"use strict";

const course = require("../models/course");
const section = require("../models/section");

exports.Query = async function(code) {
  let res = await section.Find({_id: code});
  if (!res.length) return null;
  else return res[0];
}