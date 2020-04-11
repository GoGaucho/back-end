/* 
* [test.js]
* Test and Debug
*/

"use strict";

const archive = require("./models/archive");

archive
  .Find({ _id: "lala" })
  .then((res) => {
    console.log(res);
  });