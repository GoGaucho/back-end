/*
* [models] Main Interface
* - connect Mongodb
* @{export} return db interface
*/

"use strict";

const config = require("../config");

const mongodb = require("mongodb");

const conf = config.db;

let url = "mongodb://";
url += conf.username + ":" + conf.password;
url += "@" + conf.host + ":" + String(conf.port);
url += "/?authSource=" + conf.authSource;

const client = new mongodb.MongoClient(url);

let DB;

client.connect(err => {
  if (err) throw err;
  DB = client.db(conf.db);
  console.log("# Mongodb connected!");
});

module.exports = () => {
  return DB;
};