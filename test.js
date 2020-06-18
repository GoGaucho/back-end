/* 
* [test.js]
* Test and Debug
*/

"use strict";

const daos = require("./daos");

daos("quarter.Quarter", "20202").then(res => { console.log(res) })