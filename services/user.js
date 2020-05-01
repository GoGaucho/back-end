/*
* [services] user
* - user services
* @{export} Schedule
* @{export} Registration
*/

"use strict"

const axios = require('axios');
const quarterCurrentURL = "https://api.ucsb.edu/academics/quartercalendar/v1/quarters/current";
const studentCurrentURL = "https://api.ucsb.edu/students/students/v2/students/current";
const studentScheduleURL = "https://api.ucsb.edu/students/schedules/v1/schedules/";
const studentRegistrationURL = "https://api.ucsb.edu/students/registrations/v2/registrations/";

function getRequest(ver, url, token) {
  return {
    method: 'get',
    url: url,
    auth: {
      username: process.env.UCSB_USERNAME,
      password: process.env.UCSB_PASSWORD
    },
    headers: {
      "ucsb-api-version": ver,
      "ucsb-api-key": process.env.UCSB_API_KEY,
      "ucsb-user-jwt": token
    },
  };
}

async function currentQuarter() {
  try {
    const response = await axios({
      method: 'get',
      url: quarterCurrentURL,
      headers: {
        "ucsb-api-version": "1.0",
        "ucsb-api-key": process.env.UCSB_API_KEY,
      },
      params: {
        type: "lastdayoffinals"
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function currentStudent(token) {
  try {
    const response = await axios(getRequest("2.0", studentCurrentURL, token));
    return response.data;
  } catch (error) {
    throw error;
  }
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

  try {
    const response = await axios(getRequest("1.0", url, token));
    return {
      schedule: response.data,
      quarter: quarterCode
    };
  } catch (error) {
    throw error;
  }
}

async function studentRegistration(token) {
  const student = await currentStudent(token);
  const studentPerm = student.perm;

  if (studentPerm == undefined) {
    throw new Error("No valid perm");
  }

  try {
    const url = studentRegistrationURL + studentPerm;
    const response = await axios(getRequest("2.0", url, token));
    return response.data;
  } catch (error) {
    throw error;
  }
}

exports.Schedule = studentSchedule;
exports.Registration = studentRegistration;