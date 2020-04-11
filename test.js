/* 
* [test.js]
* Test and Debug
*/

"use strict";

const daos = require("./daos");

let dc = "ortega"

daos(`dining.Menus('${dc}')`)
  .then(res => {
    console.log(res);
  })