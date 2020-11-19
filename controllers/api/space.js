/*
* [controllers/api] space
* - handles for space
* @{export} GetOne
*/

"use strict";

const space = require("../../models/space");

exports.GetOne = async function(req, resp) {
  let course = req.params.course;
  let res = await space.Find({ _id: course });
  if (!res || !res.length) resp.status(404).send("Not found");
  else resp.send(res[0]);
}
