/*
 * [daos] course
 * - get course data
 * @{export} Course
 */

"use strict";

const axios = require("axios");

const config = require("../config");

async function getData(q, code){
  return await axios // get course data
    .get(`https://api.ucsb.edu/academics/curriculums/v1/classes/${q}/${code}`, { headers: { "ucsb-api-key": config.UCSB.key } })
    .then(res => { return res.data; })
    .catch(err => { return false; });
}

exports.Course = async function(q, code) {
  let c = await getData(q, code);
  let data = {
    id: c.courseId.replace(/\s*/g, ""),
    title: c.title,
    description: c.description,
    college: c.college,
    grading: c.gradingOption,
    level: c.objLevelCode,
    min_unit: c.unitsFixed ? c.unitsFixed : c.unitsVariableLow,
    max_unit: c.unitsFixed ? c.unitsFixed : c.unitsVariableHigh,
    GE: c.generalEducation.map(x => (x.geCollege + "-" + x.geCode).replace(/\s/g, ""))
  };
  let lectures = [];
  let sections = [];
  c.classSections = c.classSections.reverse();
  for (let s of c.classSections) { // loop of section
    let info = {
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
        days: p.days.replace(/\s/g, ""),
        begin: p.beginTime,
        end: p.endTime,
        location: location
      });
    }
    // check lecture
    if (s.section % 100 == 0) {
      info["sections"] = sections.reverse();
      lectures.push(info);
      sections = [];
    } else sections.push(info);
  }
  data["lectures"] = lectures;
  return {
    data: data,
    life: 86400,
    beta: 0.618
  };
}