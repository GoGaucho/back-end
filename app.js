/* 
* [app.js]
* Main Entrance
* Initialize
*/

"use strict";

const time = require("./utils/time");

const {Worker} = require("worker_threads");

async function main() {
  // initialize tasks in a new thread
  new Worker("./tasks/index.js");
  // initialize models
  let models = require("./models");
  // wait for models
  while (!models()) await time.Sleep(1000);
  console.log("# MongoDB ready (Main Thread)");
  // initialize API server
  require("./controllers/api");
  
  require("./test");
}

// start
main();