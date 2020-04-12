/*
 * [tasks] Main Interface
 * - initialize models in task thread
 * - check tasks and do
 */

"use strict";

const config = require("../config");
const time = require("../utils/time");

async function task() {
  console.log("- Task Thread start!");
  // initialize models in this thread
  let models = require("../models");
  // wait for models
  while (!models()) await time.Sleep(1000);
  console.log("- MongoDB ready (Task Thread)");

  const task = require("../models/task");

  const m = { // all modules
    cache: require("./cache"),
    professor: require("./professor")
  }

  async function check() {
    // load dued task
    let list = await task.Find({ due: { "$lte": time.Timestamp() } });
    console.log(`- ${list.length} task(s) found`);
    for (let t of list) {
      // reset due;
      let newDue = Math.max(t.due + t.interval, time.Timestamp());
      task.Update({_id: t._id}, {"$set": {due: newDue}});
      // compile into js function
      let f = new Function("m", "para", `return m.${t.func}(para);`);
      // start task;
      f(m, t.para).then(res => { console.log(`- - Task ${t._id}: ${res}`) });
    }
  }

  setInterval(check, config.taskInterval * 1000);
}

task();