/*
 * [daos] quarter
 * - get quarter data
 * @{export} Current
 * @{export} Quarter
 */

const axios = require("axios");
const config = require("../config");

exports.Current = async function() {
  let q = await axios // get current quarter
    .get(`https://api.ucsb.edu/academics/quartercalendar/v1/quarters/current`, { headers: { "ucsb-api-key": config.UCSB.key } })
    .then(res => { return res.data; })
    .catch(err => { return {}; });
  let s = await axios // get current session
    .get(`https://api.ucsb.edu/academics/quartercalendar/v1/sessions/current`, { headers: { "ucsb-api-key": config.UCSB.key } })
    .then(res => { return res.data; })
    .catch(err => { return {}; });
  if (s.sessionNumber) s.sessionNumber = s.sessionNumber.replace(/[\s,0]*/g, "");
  else s = {}
  q["session"] = s;
  return {
    data: q,
    life: 864000,
    beta: 1
  }
}

exports.Quarter = async function(q) {
  let quarter = await axios // get quarter
    .get(`https://api.ucsb.edu/academics/quartercalendar/v1/quarters?quarter=${q}`, { headers: { "ucsb-api-key": config.UCSB.key } })
    .then(res => { return res.data.length ? res.data[0] : {}; })
    .catch(err => { return {}; });
  let ss = await axios // get sessions
    .get(`https://api.ucsb.edu/academics/quartercalendar/v1/sessions?quarter=${q}`, { headers: { "ucsb-api-key": config.UCSB.key } })
    .then(res => { return res.data; })
    .catch(err => { return []; });
  for (let s of ss) {
    if (s.sessionNumber) s.sessionNumber = s.sessionNumber.replace(/[\s,0]*/g, "");
  }
  quarter['sessions'] = ss
  return {
    data: quarter,
    life: 864000,
    beta: 1
  }
}
