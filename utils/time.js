/*
* [utils] Time
* - @{export} Sleep
*/

"use strict";

// Sleep in async function
exports.Sleep = function(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}