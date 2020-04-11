/*
 * [daos] dining
 * - get dining data
 * @{export} Hours
 * @{export} Menus
 */

"use strict";

const axios = require("axios");

const config = require("../config");
const time = require("../utils/time");

async function Hours(date) {
  let res = await axios // get hours
    .get(`https://api.ucsb.edu/dining/commons/v1/hours/${date}`, { headers: { "ucsb-api-key": config.keys.UCSB } })
    .then(res => { return res.data; })
    .catch(err => { return []; });
  return res;
}

async function Menus(dc, date) {
  let res = {};
  let hours = await Hours(date);
  for (let h of hours) {
    if (h.diningCommonCode != dc) continue;
    let m = await axios // get menu
      .get(`https://api.ucsb.edu/dining/menu/v1/${date}/${dc}/${h.mealCode}`, { headers: { "ucsb-api-key": config.keys.UCSB } })
      .then(res => { return res.data; })
      .catch(err => { return []; });
    res[h.mealCode] = { time: `${h.open}-${h.close}`, menu: m };
  }
  return res;
}

module.exports = {
  Hours: Hours,
  Menus: Menus
}