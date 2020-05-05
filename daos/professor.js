/*
 * [daos] professor
 * - get rmp data
 * @{export} RMP
 */

"use strict";

const axios = require("axios");

exports.RMP = async function(id) {
  let data = await axios
    .get(`https://solr-aws-elb-production.ratemyprofessors.com//solr/rmp/select/?wt=json&q=pk_id%3A${id}&fl=pk_id+teacherfirstname_t+teacherlastname_t+averageeasyscore_rf+averageratingscore_rf`)
    .then(res => { 
      let r = res.data.response;
      if (r.numFound) {
        let d = r.docs[0];
        return {easy: d.averageeasyscore_rf, rating: d.averageratingscore_rf};
      } else return null;
    })
    .catch(err => { return null; });
  return {
    data: data,
    life: 86400,
    beta: 1
  }
}