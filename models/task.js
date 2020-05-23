/*
 * [models] task
 * @{export} Count
 * @{export} Insert
 * @{export} Delete
 * @{export} Find
 * @{export} Upsert
 */

"use strict";

const db = require("./index");
const collection = db().collection("task");

exports.Count = async function(filter) {
  return await collection.countDocuments(query);
}

exports.Insert = async function(id, interval, due, description = "") {
  let doc = {
    _id: id,
    interval: interval,
    due: due,
    description: description
  };
  let res;
  try {
    res = await collection.insertOne(doc);
  } catch (err) {
    console.log("! " + err.errmsg);
    return 0;
  }
  return res.result.ok; // 1 for success
}

exports.Delete = async function(filter) {
  let res = await collection.deleteMany(filter);
  return res.result.ok; // 1 for success
}

exports.Find = async function(filter, opt = {}, limit = 1000) {
  let res = await collection.find(filter, opt).limit(limit).toArray();
  return res; // an Array
}

exports.Upsert = async function(filter, update) {
  let res = await collection.updateMany(filter, update, {upsert: true});
  return res.result.ok;
}