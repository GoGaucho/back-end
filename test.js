/* 
* [test.js]
* Test and Debug
*/

"use strict";

const info = require("./models/info");
const course = require("./models/course");

course.Find({_id: /^20204/}, {projection: {tree: 1}}, 3000)
  .then(res => {
    info.Upsert({_id: "test"}, {$set: {data: JSON.stringify(res)}});
  })