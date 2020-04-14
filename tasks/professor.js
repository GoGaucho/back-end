/*
* [tasks] professor
* - refresh professor data
*/

"use strict";

const axios = require("axios");

const prof = require("../models/professor");

exports.List = async function() {
  let data = await axios // get rmp data
    .get(`https://solr-aws-elb-production.ratemyprofessors.com//solr/rmp/select/?wt=json&q=*%3A*+AND+schoolid_s%3A1077&fl=pk_id+teacherfirstname_t+teacherlastname_t&sort=pk_id+asc&rows=10000`)
    .then(res => { return res.data.response.docs; })
    .catch(err => { return []; });
  for (let p of data) {
    let r = await prof.Find({_id: p.pk_id});
    let rmp = {easy: p.averageeasyscore_rf, rating: p.averageratingscore_rf};
    if (!r.length) { // create
      prof.Insert(p.pk_id, p.teacherlastname_t + ", " + p.teacherfirstname_t);
    }
  }
  return "done";
}