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
  if (!s) {
    resp.status(400).send("Params Err: s required");
    return;
  }
  let res = await course.Search(q, s);
  resp.send(res);
}

// query by code
exports.Query = async function(req, resp) {
  let q = req.params.q;
  let id = req.params.id;
  let res = await course.Course(q, id);
  if (!res) resp.status(404).send("Not found");
  else resp.send(res);
}