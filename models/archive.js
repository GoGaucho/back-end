/*
* [models] archive
* @{export} Count
* @{export} Insert
* @{export} Delete
* @{export} Find
*/

"use strict";

const db = require("./index");
const collection = db().collection("archive");

exports.Count = async function (filter) {
  return await collection.countDocuments(query);
}

exports.Insert = async function (id, timestamp, data) {
  let doc = { _id: id, timestamp:timestamp, data: data };
  let res;
  try {
    res = await collection.insertOne(doc);
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
  let res = await collection.find(filter).limit(limit).toArray();
  return res; // an Array
}