/*
* [services] professor
* - professor services
* @{export} Query
*/

"use strict";

const professor = require("../models/professor");
const daos = require("../daos");

exports.Query = async function(input) {
  let name = input.replace(/^\s*/g, "").replace(/\s*$/g, "").replace(/\s+/g, " ");
  let pieces = name.split(" ");
  let regex;
  switch (pieces.length) {
    case 1: {
      regex = eval(`/^${pieces[0]}/i`);
      break;
    }
    case 2: {
      regex = eval(`/^${pieces[0]},\\s${pieces[1]}/i`);
      break;
    }
    case 3: {
      regex = eval(`/^${pieces[0]},\\s${pieces[1]}.*${pieces[2]}$/i`);
      break;
    }
    default: {
      return null;
    }
  }
  let res = await professor.Find({ name: regex });
  if (!res.length) return null; // not found in the model
  let p = res[0];
  let rmp = await daos(`professor.RMP("${p._id}")`);
  p["rmp"] = rmp;
  return p;
}