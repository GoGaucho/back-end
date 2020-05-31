/* 
* [test.js]
* Test and Debug
*/

"use strict";

const time = require("./utils/time");
const course = require("./tasks/course");

console.log("Test Start ", time.Timestamp());
course.Course(['20204']).then(res => {
  console.log("Test End", time.Timestamp());
})