/*
* [controllers/api] info
* - handles for info
* @{export} Query
*/

"use strict";

const info = require("../../services/info");

exports.Query = async function(req, resp) {
  let key = req.params.key;
  let res = await info.Query(key);
  if (!res) resp.status(404).send("Not found");
  else resp.send(res);
}