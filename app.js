/* 
* [app.js]
* Main Entrance
* Initialize
*/

"use strict";

const time = require("./utils/time");

async function main() {
  // initialize models
  let models = require("./models");
  // wait for models
  while (!models()) await time.Sleep(1000);
  // initialize other layers
  
}

// start
main();