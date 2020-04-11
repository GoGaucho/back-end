/*
* [services] waitz
* - dining services
* @{export} Hours
* @{export} Menus
*/

"use strict";

const daos = require("../daos");

exports.Hours = async function(date) {
  return await daos(`dining.Hours("${date}")`);
}

exports.Menus = async function(dc, date) {
  return await daos(`dining.Menus("${dc}", "${date}")`);
}