/*
* [tasks] space
* @{export} Space - get space
*/

"use strict";

const axios = require("axios");

const config = require("../config");
const time = require("../utils/time");

const space = require("../models/space");
const info = require("../models/info");

async function getData(q, i){
  return await axios // get course data
    .get(`https://api.ucsb.edu/academics/curriculums/v3/classspaceavailability/${q}?pageNumber=${i}&pageSize=500`, { headers: { "ucsb-api-key": config.UCSB.key } })
    .then(res => { return res.data.classSpaces; })
    .catch(err => { return false; });
}

exports.Space = async function(q) {
  const timestamp = time.Timestamp()
  const res = await info.Find({ _id: 'CourseSpace' + q });
  let record = {};
  if (res && res.length) record = res[0].data;
  let newRecord = {};
  let updates = {};
  for (let i = 1; ; i++) { // page loop
    let data = await getData(q, i);
    if (!data || !data.length) break;
    for (const c of data) {
      const id = c.courseId.replace(/\s/g, "");
      let courseUpdate = {}, isUpdate = false;
      for (const s of c.classSpaceAvailabilities) {
        const old = record[s.enrollCode];
        const total = Number(s.enrolledTotal), max = Number(s.maxEnroll);
        const curr = Math.max(max - total, 0);
        if (s.section % 100 == 0 && (!old || old[0] != curr)) {
          isUpdate = true;
          courseUpdate[s.enrollCode + "." + timestamp] = curr;
        }
        newRecord[s.enrollCode] = [curr, max];
      }
      if (isUpdate) updates[q + id] = courseUpdate;
    }
  }
  await space.UpsertMany(updates);
  await info.Upsert({ _id: 'CourseSpace' + q }, { $set: { data: newRecord, timestamp } });
  return "done";
}