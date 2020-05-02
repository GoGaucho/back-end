/*
* [controllers/api] student
* - handles for student
* @{export} Schedule
* @{export} Registration
*/

"use strict"

const student = require("../../services/student");

exports.Schedule = async function (req, res) {
  try {
    const token = req.header('token');
    const result = await student.Schedule(token);
    res.send(result);
  } catch (e) {
    console.log(e);
    if ((e.response.status) && (e.response.data)) {
      res.status(e.response.status).send(e.response.data);
    } else if (e.response.status) {
      res.status(e.response.status).send({
        "message": "Internal Server Error"
      });
    } else {
      res.status(500).send({
        "message": "Internal Server Error"
      });
    }
  }
}

exports.Registration = async function (req, res) {
  const token = req.header('token');
  try {
    const result = await student.Registration(token);
    res.send(result);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
}

exports.Login = async function (req, res) {
  
}