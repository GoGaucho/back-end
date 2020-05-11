/*
* [tasks] cache
* - clear expired cache
*/

"use strict";

const cache = require("../models/cache");
const time = require("../utils/time");

exports.Clean = async function() {
  let res = await cache.Delete({
    "$where": `this.timestamp + this.life < ${time.Timestamp()}`
  });
  return res ? "success" : "fail";
}