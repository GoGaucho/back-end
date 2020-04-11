/*
 * [daos] waitz
 * - get waitz data
 * @{export} Waitz
 */

"use strict";

const axios = require("axios");

exports.Waitz = async function() {
  return await axios
    .get(`https://waitz.io/live/ucsb-campus/`)
    .then(res => { return res.data.data; })
    .catch(err => { return []; })
}