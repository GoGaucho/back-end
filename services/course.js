/*
* [services] course
* - course services
* @{export} Course
* @{export} Section
* @{export} Search
*/

"use strict";

const info = require("../models/info");
const course = require("../models/course");
const section = require("../models/section");

async function getQuarter() { // get quarter from info
  let res = await info.Find({_id: "Quarter"});
  if (res.length) return res[0].data;
  else return false;
}

exports.Course = async function(code) {
  let res = await course.Find({_id: code});
  if (!res.length) return null;
  let c = res[0];
  let q = await getQuarter();
  if (!q) return null;
  let lectures = await section.Find({_id: {"$regex": q[3]+q[4]}, course: code, lecture: true});
  let sections = await section.Find({_id: {"$regex": q[3]+q[4]}, course: code, lecture: false});
  c["lectures"] = lectures;
  c["sections"] = sections;
  return c;
}

exports.Section = async function(code) {
  let res = await section.Find({_id: code});
  if (!res.length) return null;
  else return res[0];
}

exports.Search = async function(s) {
  let q = s.replace(/\s+/g, "\\s*");
  let regex = eval(`/${q}/i`);
  let res = {};
  // start search
  let t = await course.Find({_id: regex});
  res["id"] = t.map(x => x._id);
  t = await course.Find({title: regex});
  res["title"] = t.map(x => x._id);
  t = await course.Find({description: regex});
  res["description"] = t.map(x => x._id);
  t = await course.Find({GE: regex});
  res["GE"] = t.map(x => x._id);
  return res;
}