/*
* [controllers/api] professor
* - handles for professor
* @{export} Query
*/

"use strict";

const prof = require("../../services/professor");

exports.Query = async function(req, resp) {
  let name = req.params.name;
  let res = await prof.Query(name);
  if (!res) resp.status(404).send("Professor not found");
  else resp.send(res);
}