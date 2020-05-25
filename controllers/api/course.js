/*
* [controllers/api] course
* - handles for course
* @{export} Search
* @{export} Query
*/

"use strict";

const course = require("../../services/course");
const time = require("../../utils/time");

exports.Search = async function(req, resp) {
  let q = req.params.q;
  let s = req.query.s;
  let f = req.query.f;
  if (!s) {
    resp.status(400).send("Params Err: s required");
    return;
  }
  let res = {};
  console.log(Array.isArray(f))
  if (Array.isArray(f)) res = await course.Search(q, s, f);
  else res = await course.Search(q, s);
  resp.send(res);
}

// query by code(s)
exports.Query = async function(req, resp) {
  let q = req.params.q;
  let ids = req.params.id.split(",");
  let res = null;
  if (ids.length == 1) res = await course.Course(q, ids[0]);
  else res = await course.Courses(q, ids);
  if (!res) resp.status(404).send("Not found");
  else resp.send(res);
}