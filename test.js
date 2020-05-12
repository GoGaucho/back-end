/* 
* [test.js]
* Test and Debug
*/

"use strict";

const info = require("./models/info");
const course = require("./tasks/course");

//info.Insert("test", 111, {test: "ddd"});
course.Course(["20201"]).then(res => {console.log(res);});
