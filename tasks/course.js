/*
* [tasks] course
* - get course data
*/

"use strict";

const axios = require("axios");

const config = require("../config");
const time = require("../utils/time");

const info = require("../models/info");
const archive = require("../models/archive");
const course = require("../models/course");
const section = require("../models/section");

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
    for (let c of data) {
      docs.push({
        _id: c.courseId.replace(/\s*/g, ""),
        title: c.title,
        description: c.description,
        college: c.college,
        grading: c.gradingOption,
        level: c.objLevelCode,
        min_unit: c.unitsFixed ? c.unitsFixed : c.unitsVariableLow,
        max_unit: c.unitsFixed ? c.unitsFixed : c.unitsVariableHigh,
        GE: c.generalEducation.map(x => (x.geCollege + "-" + x.geCode).replace(/\s/g, ""))
      });
    }
    await course.Insert(docs);
  }
  return "done";
}

exports.Section = async function() {
  let q = await getQuarter();
  if (!q) return "Fail, no quarter";
  let record = {}
  for (let i = 1; ; i++) { // loop of getting data
    let data = await getData(q, i);
    if (!data) return "Abrupted by a request failure.";
    if (!data.length) break;
    for (let c of data) { // loop of course
      let courseId = c.courseId.replace(/\s*/g, "");
      c.classSections = c.classSections.reverse();
      let sections = [];
      for (let s of c.classSections) { // loop of section
        let id = q[3] + q[4] + s.enrollCode;
        let info = {
          lecture: (s.section % 100) ? false : true,
          course: courseId,
          session: s.session,
          disabled: s.classClosed || s.courseCancelled,
          max: s.maxEnroll,
          space: s.maxEnroll - s.enrolledTotal,
          instructors: s.instructors.map(x => x.instructor).filter(x => x),
          periods: []
        }
        // process periods
        for (let p of s.timeLocations) {
          if (!p.days) continue;
          let location = "";
          if (!p.building) location = null;
          else if (!p.room) location = p.building;
          else location = `${p.building}-${p.room}`;
          info.periods.push({
            days: p.days.replace(/\s*/g, ""),
            begin: p.beginTime,
            end: p.endTime,
            location: location
          });
        }
        // check lecture
        if (info.lecture) {
          info["sections"] = sections.reverse();
          sections = [];
        } else sections.push(id);
        // check exist
        let r = await section.Find({_id: id});
        if (!r.length) {
          info["_id"] = id;
          record[id] = info.space;
          await section.Insert(info);
        } else {
          if (info.space != r.space) record[id] = info.space;
          await section.Update({_id: id}, {"$set": info});
        }
      }
    }
  }
  await archive.Insert("SPACE" + String(time.Timestamp()), time.Timestamp(), record);
  return "done";
}