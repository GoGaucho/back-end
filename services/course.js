/*
* [services] course
* - course services
* @{export} Course
* @{export} Section
* @{export} Search
*/

"use strict";

const daos = require("../daos");

const info = require("../models/info");
const course = require("../models/course");

async function getQuarter() { // get quarter from info
  let res = await info.Find({_id: "Quarter"});
  if (res.length) return res[0].data;
  else return false;
}

exports.Course = async function(code) {
  let q = await getQuarter();
  return "Unavailable.";
}

exports.Search = async function(s) {
  let q = s.replace(/\s+/g, "\\s*");
  let regex = eval(`/${q}/i`);
  let res = {};
  // start search
  res["id"] = await course.Find({_id: regex});
  res["title"] = await course.Find({title: regex});
  res["description"] = await course.Find({description: regex});
  res["GE"] = await course.Find({GE: regex});
  return res;
}