/* 
* [test.js]
* Test and Debug
*/

"use strict";

const daos = require("./daos");
const task = require("./models/task");
const time = require("./utils/time");

task.Insert("cache", 1800, time.Timestamp(), "cache");