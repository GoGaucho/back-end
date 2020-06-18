/*
* [services] quarter
* - quarter info
* @{export} Current
* @{export} Quarter
*/

"use strict";

const daos = require("../daos");

exports.Current = async function() {
  return await daos("quarter.Current");
}

exports.Quarter = async function(q) {
  return await daos("quarter.Quarter", q);
}