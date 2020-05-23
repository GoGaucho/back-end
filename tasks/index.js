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
    professor: require("./professor"),
    course: require("./course")
  }

  async function check() {
    // load dued task
    let list = await task.Find({ due: { "$lte": time.Timestamp() } });
    console.log(`- ${list.length} task(s) found`);
    for (let t of list) {
      // reset due;
      let newDue = Math.max(t.due + t.interval, time.Timestamp());
      if (t.interval <= 0) newDue = 2147483647; // not due
      task.Upsert({_id: t._id}, {"$set": {due: newDue}});
      // compile into js function
      let f = new Function("m", `return m.${t._id};`);
      
      f(m)  // start task;
        .then(res => { console.log(`- - Task ${t._id}: ${res}`) })
        .catch(err => { console.log(err); });
    }
  }

  check();
  setInterval(check, config.taskInterval * 1000);
}

task();