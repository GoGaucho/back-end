/*
* [services] course
* - course services
* @{export} Course
* @{export} Search
*/

"use strict";

const daos = require("../daos");

const course = require("../models/course");

exports.Course = async function(q, id) {
  let res = await course.Find({_id: `${q}-${id.toUpperCase()}`});
  if (!res.length) return false;
  else return res[0];
}

exports.Search = async function(q, s) {
  let sregex = eval(`/${s.replace(/\s+/g, "\\s*")}/i`);
  let qobj = {_id: eval(`/^${q}-/`)};
  let res = {};
  // start search
  res["id"] = await course.Find({"$and": [qobj, {_id: sregex}]}, false);
  res["title"] = await course.Find({"$and": [qobj, {"info.title": sregex}]}, false);
  res["description"] = await course.Find({"$and": [qobj, {"info.description": sregex}]}, false);
  res["GE"] = await course.Find({"$and": [qobj, {"info.GE": sregex}]}, false);
  return res;
}