/*
* [tasks] course
* - get course data
*/

"use strict";

const axios = require("axios");

const config = require("../config");
const time = require("../utils/time");

const info = require("../models/info");
const course = require("../models/course");

async function getQuarter() { // get quarter from info
  let res = await info.Find({_id: "Quarter"});
  if (res.length) return res[0].data;
  else return false;
}

exports.List = async function() {
  let q = await getQuarter();
  if (!q) return "Fail, no quarter";
  for (let i = 1; ; i++) {
    let data = await axios // get course data
      .get(`https://api.ucsb.edu/academics/curriculums/v1/classes/search?quarter=${q}&pageNumber=${i}&pageSize=100`, { headers: { "ucsb-api-key": config.keys.UCSB } })
      .then(res => { return res.data.classes; })
      .catch(err => { return false; });
    if (!data) return "Abrupted by a request failure.";
    if (!data.length) break;
    for (let c of data) {
      // course.Insert(c);
    }
    console.log("+ 100 loaded");
  }
  return "done";
}