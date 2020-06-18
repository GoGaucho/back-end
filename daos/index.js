/*
 * [daos] Main Interface
 * - operate models.cache
 * - functional cache
 * @{export} (func, param1, param2 ...) => result
 */

"use strict";

const cache = require("../models/cache");
const time = require("../utils/time");
const crypto = require("../utils/crypto");

// all modules
const m = {
  dining: require("./dining"),
  waitz: require("./waitz"),
  professor: require("./professor"),
  quarter: require("./quarter")
}

// check cache and update life
async function check(id) {
  let res = await cache.Find({ _id: id });
  if (res.length == 0) return {exist: false};
  let r = res[0];
  // check life
  if (r.timestamp + r.life < time.Timestamp()) {
    // must await, in case of insert before deleting
    await cache.Delete({_id: id});
    return {exist: false};
  }
  // decay
  if (r.life > 300 && r.beta != 1) {
    await cache.Update({_id: id}, {"$set": {life: Math.floor(r.life * r.beta)}});
  }
  return {exist: true, data:r.data};
}

// this function receive parameters by arguments
// func, param1, param2, ...
module.exports = async function() {
  if (!arguments.length) return false;
  let args = [].slice.call(arguments);
  let id = args.join();
  let res = await check(id);
  if (!res.exist) { // no cache data
    // get function
    let f = (new Function("m", "return m." + args[0]))(m);
    args.shift();
    let r = await f.apply(null, args); // run function
    res["data"] = r.data;
    if (r.beta > 0) {
      cache.Insert(id, time.Timestamp(), r.life, r.beta, r.data);
    }
  }
  return res.data;
}