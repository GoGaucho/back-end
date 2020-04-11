/*
* [tasks] cache
* - clear expired cache
*/

"use strict";

const time = require("../utils/time");
const config = require("../config");
const cache = require("../models/cache");

setInterval(() => {
  cache.Delete({ expire: { "$lt": time.Timestamp() } });
  console.log("- tasks/cache: clean cache");
}, config.tasks.cache*1000);

console.log("- tasks/cache: loaded");