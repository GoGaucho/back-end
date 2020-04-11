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
  return Math.floor((new Date()).getTime()/1000) + lag;
}