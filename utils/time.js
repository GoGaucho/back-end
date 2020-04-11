/*
 * [utils] Time
 * - @{export} Sleep
 * - @{export} Timestamp
 */

"use strict";

// Sleep in async function
exports.Sleep = function(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Timestamp with lag
exports.Timestamp = function(lag = 0) {
  return Math.floor((new Date()).getTime() / 1000) + lag;
}

// date yyyy-mm-dd
exports.Date = function() {
  let d = new Date();
  let year = d.getFullYear();
  let month = (d.getMonth() + 1).toString();
  let day = (d.getDate()).toString();
  if (month.length == 1) {
    month = "0" + month;
  }
  if (day.length == 1) {
    day = "0" + day;
  }
  return year + "-" + month + "-" + day;
}