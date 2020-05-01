/*
* [services] user
* - user services
* @{export} Schedule
* @{export} Registration
*/

"use strict"

const axios = require('axios');
const config = require("../config");
const quarterCurrentURL = "https://api.ucsb.edu/academics/quartercalendar/v1/quarters/current";
const studentCurrentURL = "https://api.ucsb.edu/students/students/v2/students/current";
const studentScheduleURL = "https://api.ucsb.edu/students/schedules/v1/schedules/";
const studentRegistrationURL = "https://api.ucsb.edu/students/registrations/v2/registrations/";

function getRequest(ver, url, token) {
  return {
    method: 'get',
    url: url,
    auth: {
      username: config.keys.UCSB_USERNAME,
      password: config.keys.UCSB_PASSWORD
    },
    headers: {
      "ucsb-api-version": ver,
      "ucsb-api-key": config.keys.UCSB,
      "ucsb-user-jwt": token
    },
  };
}

async function currentQuarter() {
  const response = await axios({
    method: 'get',
    url: quarterCurrentURL,
    headers: {
      "ucsb-api-version": "1.0",
      "ucsb-api-key": config.keys.UCSB,
    },
    params: {
      type: "lastdayoffinals"
    }
  });
  return response.data;
}

async function currentStudent(token) {
  const response = await axios(getRequest("2.0", studentCurrentURL, token));
  return response.data;
}

async function studentSchedule(token) {
  const student = await currentStudent(token);
  const quarter = await currentQuarter();

  const studentPerm = student.perm;
  const quarterCode = quarter.quarter;

  if (studentPerm == undefined || quarterCode == undefined) {
    throw new Error("No perm or quarter");
  }

  let url = studentScheduleURL + studentPerm + "/" + quarterCode;

  const response = await axios(getRequest("1.0", url, token));
  return {
    schedule: response.data,
    quarter: quarterCode
  };
}

async function studentRegistration(token) {
  const student = await currentStudent(token);
  const studentPerm = student.perm;

  if (studentPerm == undefined) {
    throw new Error("No valid perm");
  }

  const url = studentRegistrationURL + studentPerm;
  const response = await axios(getRequest("2.0", url, token));
  return response.data;
}

exports.Schedule = studentSchedule;
exports.Registration = studentRegistration;