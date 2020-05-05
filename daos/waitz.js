/*
 * [daos] waitz
 * - get waitz data
 * @{export} Waitz
 */

"use strict";

const axios = require("axios");

exports.Waitz = async function() {
  let data = await axios // get waitz data
    .get(`https://waitz.io/live/ucsb-campus/`)
    .then(res => { return res.data.data; })
    .catch(err => { return []; });
  return {
    data: data,
    life: 600,
    beta: 1
  }
}