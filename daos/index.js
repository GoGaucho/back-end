/*
 * [daos] Main Interface
 * - operate models.cache
 * - functional cache
 * @{export} (func) => result
 */

"use strict";

const cache = require("../models/cache");
const time = require("../utils/time");
const crypto = require("../utils/crypto");

// all modules
const m = {
  dining: require("./dining"),
  waitz: require("./waitz")
}

async function check(id) {
  let res = await cache.Find({ _id: id });
  if (res.length == 0) return null;
  let r = res[0];
  if (r.expire < time.Timestamp()) {
    await cache.Delete({ _id: id });
    return null;
  }
  return r.data;
}

module.exports = async function(func, expireIn = 86400) {
  let key = crypto.HASH(func);
  let res = await check(key);
  if (!res) { // no cache data
    let f = new Function("m", "return m." + func);
    res = await f(m);
    if (expireIn > 0) {
      cache.Insert(key, time.Timestamp() + expireIn, res);
    }
  }
  return res;
}