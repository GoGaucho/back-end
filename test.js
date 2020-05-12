/* 
* [test.js]
* Test and Debug
*/

"use strict";

const course = require("./tasks/course");

course.Course(["20201"]).then(res => {console.log(res);});
