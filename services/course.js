/*
* [services] course
* - course services
* @{export} Course
* @{export} Courses
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

exports.Courses = async function(q, ids) {
  let _ids = ids.map(x => `${q}-${x.toUpperCase()}`);
  let res = await course.Find({_id: {"$in": _ids}});
  return res;
}

exports.Search = async function(q, s, fields = ["_id", "info.title", "info.description", "info.GE"]) {
  let sregex = eval(`/${s.replace(/\s+/g, "\\s*")}/i`);
  let qobj = {_id: eval(`/^${q}-/`)};
  let opt = {projection: {_id: 1, "info.title": 1}};
  let res = {};
  for (let f of fields) {
    let filter = {};
    filter[f] = sregex;
    const raw = await course.Find({"$and": [qobj, filter]}, opt);
    res[f] = [];
    for (let x of raw) {
      res[f].push({id: x._id.split("-", 2)[1], title: x.info.title});
    }
  }
  return res;
}