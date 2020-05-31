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
    res[s.enrollCode] = [
      s.section, Boolean(s.classClosed), Boolean(s.courseCancelled), ["", ""], s.instructors.map(x => x.instructor).filter(x => x), getPeriods(s.timeLocations)
    ]
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
      let ss = s.session || "main";
      ss = ss.replace(/[\s,0]*/g, "")
      res[ss] = {};
      lec[cur] = {session: ss, sections: []};
    } else lec[cur].sections.push(s.enrollCode);
  }
  for (let l in lec) res[lec[l].session][l] = lec[l].sections;
  return res;
}

exports.Course = async function(quarters) {
  let courseHash = {}
  for (let q of quarters) { // loop of quarters
    let courseInfo = {};
    let courseSections = {};
    let courseTree = {};
    for (let i = 1; ; i++) { // loop of pages
      let data = await getData(q, i);
      if (!data) return "Abrupted by a request failure.";
      if (!data.length) break;
      for (let c of data) { // loop for course
        const id = c.courseId.replace(/\s*/g, "")
        courseInfo[id] = [
          c.title, c.description, c.college, c.gradingOption, c.objLevelCode, null, (c.unitsFixed ? c.unitsFixed : c.unitsVariableLow), (c.unitsFixed ? c.unitsFixed : c.unitsVariableHigh), c.generalEducation.map(x => (x.geCollege + "-" + x.geCode).replace(/\s/g, ""))
        ];
        courseSections[id] = getSections(c.classSections);
        courseTree[id] = getTree(c.classSections);
      }
    }
    courseHash[`CourseInfo${q}`] = crypto.MD5(JSON.stringify(courseInfo));
    courseHash[`CourseSections${q}`] = crypto.MD5(JSON.stringify(courseSections));
    courseHash[`CourseTree${q}`] = crypto.MD5(JSON.stringify(courseTree));
    await info.Upsert({_id: `CourseInfo${q}`}, {"$set" : {timestamp: time.Timestamp(), data: courseInfo}});
    await info.Upsert({_id: `CourseSections${q}`}, {"$set" : {timestamp: time.Timestamp(), data: courseSections}});
    await info.Upsert({_id: `CourseTree${q}`}, {"$set" : {timestamp: time.Timestamp(), data: courseTree}});
  }
  await info.Upsert({_id: `CourseHash`}, {"$set" : {timestamp: time.Timestamp(), data: courseHash}});
  return "done";
}