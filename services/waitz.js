/*
* [services] waitz
* - dining services
* @{export} Waitz
*/

"use strict";

const daos = require("../daos");

exports.Waitz = async function(date) {
  return await daos("waitz.Waitz");
}