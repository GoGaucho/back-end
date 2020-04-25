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
  let s = req.query.s;
  if (!s) {
    resp.status(400).send("Params Err: s required");
    return;
  }
  let res = await course.Search(s);
  resp.send(res);
}

// query by courseId or QECode
exports.Query = async function(req, resp) {
  let code = req.params.code.toUpperCase().replace(/\s*/g, "");
  let res = await (isNaN(code) ? course.Course(code) : course.Section(code));
  if (!res) resp.status(404).send("Not found");
  else resp.send(res);
}