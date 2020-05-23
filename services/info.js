/*
* [services] info
* - info services
* @{export} Query
* @{export} All
* @{export} Upsert
* @{export} Delete
*/

"use strict";

const info = require("../models/info");
const time = require("../utils/time");

exports.Query = async function(key) {
  let res = await info.Find({_id: key});
  if (!res.length) return false;
  else return res[0];
}

exports.All = async function() {
  return await info.Find({}, {projection: {_id: 1, timestamp: 1}});
}

exports.Upsert = async function(key, data) {
  let doc = {
    _id: key,
    timestamp: time.Timestamp(),
    data: data
  }
  return await info.Upsert({_id: key}, {"$set": doc});
}

exports.Delete = async function(key) {
  return await info.Delete({_id: key});
}