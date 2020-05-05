/*
* [models] course
* @{export} Count
* @{export} Insert
* @{export} Delete
* @{export} Find
* @{export} Update
*/

"use strict";

const db = require("./index");
const collection = db().collection("course");

exports.Count = async function (filter) {
  return await collection.countDocuments(query);
}

exports.Insert = async function (docs) {
  let res;
  try {
    res = await collection.insertMany(docs);
  } catch (err) {
    console.log("! " + err.errmsg);
    return 0;
  }
  return res.result.ok; // 1 for success
}

exports.Delete = async function (filter) {
  let res = await collection.deleteMany(filter);
  return res.result.ok; // 1 for success
}

exports.Find = async function (filter, limit = 1000) {
  let res = await collection.find(filter, {projection: {_id: 1, code: 1}}).limit(limit).toArray();
  return res; // an Array
}

exports.Update = async function (filter, update) {
  let res = await collection.updateMany(filter, update);
  return res.result.ok;
}