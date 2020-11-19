/*
* [models] Space
* @{export} Delete
* @{export} Find
* @{export} UpsertMany
*/

"use strict";

const db = require("./index");
const collection = db().collection("space");

exports.Delete = async function (filter) {
  let res = await collection.deleteMany(filter);
  return res.result.ok; // 1 for success
}

exports.Find = async function (filter, opt = {}, limit = 1000) {
  let res = await collection.find(filter, opt).limit(limit).toArray();
  return res; // an Array
}

exports.UpsertMany = async function (updates) {
  let operations = [];
  for (const u in updates) {
    operations.push({ updateOne: { filter: { _id: u }, update: { $set: updates[u] }, upsert: true } })
  }
  let res = await collection.bulkWrite(operations);
  return res.result.ok;
}
