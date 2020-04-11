/*
* [tasks] Main Interface
* - initiate all task modules
*/

"use strict";

const config = require("../config");
const conf = config.tasks;

console.log("# Tasks Loading ...");

for (let i in conf) {
  require(`./${i}`);
}