/*
 * [tasks] Main Interface
 * - check tasks and do
 */

"use strict";

const config = require("../config");

const task = require("../models/task");
const time = require("../utils/time");

const m = { // all modules
  cache: require("./cache")
}

async function check() {
  // load dued task
  let list = await task.Find({ due: { "$lte": time.Timestamp() } });
  console.log(`# ${list.length} task(s) found`);
  for (let t of list) {
    // compile into js function
    let f = new Function("m", "para", `return m.${t.func}(para);`);
    // start task;
    f(m, t.para).then(res => { console.log(`- Task ${t._id}: ${res}`) });
    // reset due;
    task.Update({_id: t._id}, {"$set": {due: t.due + t.interval}});
  }
}

setInterval(check, config.taskInterval * 1000);