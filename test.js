/* 
* [test.js]
* Test and Debug
*/

"use strict";

const time = require("./utils/time");
const task = require("./tasks/cache");

task().then(res => {console.log(res);});