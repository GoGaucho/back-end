/*
* [services] task
* - task services (for admin)
* @{export} Query
* @{export} All
* @{export} Upsert
* @{export} Delete
*/

"use strict";

const task = require("../models/task");

exports.Query = async function(key) {
  let res = await task.Find({_id: key});
  if (!res.length) return false;
  else return res[0];
}

exports.All = async function() {
  return await task.Find({}, {projection: {_id: 1, description: 1}});
}

exports.Upsert = async function(doc) {
  return await task.Upsert({_id: doc._id}, {"$set": doc});
}

exports.Delete = async function(key) {
  return await task.Delete({_id: key});
}