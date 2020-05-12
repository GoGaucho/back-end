/*
* [tasks] course
* @{export} Course - get course data
*/

"use strict";

const axios = require("axios");

const config = require("../config");
const time = require("../utils/time");
const crypto = require("../utils/crypto");

const info = require("../models/info");
const course = require("../models/course");

async function getData(q, i){
  return await axios // get course data
    .get(`https://api.ucsb.edu/academics/curriculums/v1/classes/search?quarter=${q}&pageNumber=${i}&pageSize=100`, { headers: { "ucsb-api-key": config.UCSB.key } })
    .then(res => { return res.data.classes; })
    .catch(err => { return false; });
}

async function getFinal(q, code) {
  return await axios // get course data
    .get(`https://api.ucsb.edu/academics/curriculums/v1/finals?quarter=${q}&enrollCode=${code}`, { headers: { "ucsb-api-key": config.UCSB.key } })
    .then(res => { return res.data; })
    .catch(err => { return false; });
}

// process periods
function getPeriods(timeLocations) {
  let res = [];
  for (let p of timeLocations) {
    if (!p.days) continue;
    let location = "";
    if (!p.building) location = null;
    else if (!p.room) location = p.building;
    else location = `${p.building}-${p.room}`;
    res.push({
      days: p.days.replace(/\s/g, ""),
      begin: p.beginTime,
      end: p.endTime,
      location: location
    });
  }
  return res;
}

// process sections info
function getSections(classSections) {
  let res = {};
  for (let s of classSections) {
    res[s.enrollCode] = {
      section: s.section,
      close: Boolean(s.classClosed),
      cancel: Boolean(s.courseCancelled),
      instructors: s.instructors.map(x => x.instructor).filter(x=>x),
      periods: getPeriods(s.timeLocations)
    }
    if (s.section % 100 == 0) res[s.enrollCode]["final"] = { time: "", comment: "" };
  }
  return res;
}

// process tree
// no maintance needed. If really needed, rewrite it.
function getTree(classSections) {
  let lec = {};
  let res = {};
  let cur = null;
  for (let s of classSections) {
    if (s.section % 100 == 0) {
      cur = s.enrollCode;
      const ss = s.session || "00000";
      res[ss] = {};
      lec[cur] = {session: ss, sections: []};
    } else lec[cur].sections.push(s.enrollCode);
  }
  for (let l in lec) res[lec[l].session][l] = lec[l].sections;
  return res;
}

exports.Course = async function(quarters) {
  for (let q of quarters) { // loop of quarters
    let hash = {};
    for (let i = 1; ; i++) { // loop of pages
      let data = await getData(q, i);
      if (!data) return "Abrupted by a request failure.";
      if (!data.length) break;
      for (let c of data) { // loop for course
        let doc = {
          _id: q + "-" + c.courseId.replace(/\s*/g, ""),
          info: {
            title: c.title,
            description: c.description,
            college: c.college,
            grading: c.gradingOption,
            level: c.objLevelCode,
            restriction: null,
            min_unit: c.unitsFixed ? c.unitsFixed : c.unitsVariableLow,
            max_unit: c.unitsFixed ? c.unitsFixed : c.unitsVariableHigh,
            GE: c.generalEducation.map(x => (x.geCollege + "-" + x.geCode).replace(/\s/g, ""))
          },
          sections: getSections(c.classSections),
          tree: getTree(c.classSections)
        };
        await course.Upsert({_id: doc._id}, {"$set": doc});
        hash[doc._id] = crypto.MD5(JSON.stringify(doc)); // hash
      }
    }
    let h = await info.Find({_id: `CourseHash${q}`});
    if (!h.length) {
      await info.Insert(`CourseHash${q}`, time.Timestamp(), hash);
    } else {
      await info.Update({_id: `CourseHash${q}`}, {"$set" : {timestamp: time.Timestamp(), data: hash}});
    }
  }
  return "done";
}