/*
* [tasks] course
* @{export} Course - get course data
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

async function getData(q, i){
  return await axios // get course data
    .get(`https://api.ucsb.edu/academics/curriculums/v1/classes/search?quarter=${q}&pageNumber=${i}&pageSize=100`, { headers: { "ucsb-api-key": config.UCSB.key } })
    .then(res => { return res.data.classes; })
    .catch(err => { return false; });
}

exports.Course = async function() {
  let q = await getQuarter();
  if (!q) return "Fail, no quarter";
  await course.Delete({}); // delete all docs
  for (let i = 1; ; i++) {
    let data = await getData(q, i);
    if (!data) return "Abrupted by a request failure.";
    if (!data.length) break;
    let docs = [];
    for (let c of data) { // loop for course
      docs.push({
        _id: c.courseId.replace(/\s*/g, ""),
        title: c.title,
        description: c.description,
        college: c.college,
        grading: c.gradingOption,
        level: c.objLevelCode,
        min_unit: c.unitsFixed ? c.unitsFixed : c.unitsVariableLow,
        max_unit: c.unitsFixed ? c.unitsFixed : c.unitsVariableHigh,
        GE: c.generalEducation.map(x => (x.geCollege + "-" + x.geCode).replace(/\s/g, "")),
        code: c.classSections[0] ? c.classSections[0].enrollCode : null
      });
    }
    await course.Insert(docs);
  }
  return "done";
}