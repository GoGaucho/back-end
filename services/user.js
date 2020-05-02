/*
* [services] user
* - user services
* @{export} Login
*/

"use strict";

const axios = require("axios");

const config = require("../config");
const user = require("../models/user");
const token = require("../utils/token");

exports.Login = async function(code) {
  let tokens = await axios // get token
  .post("https://oauth2.googleapis.com/token", {
    code: code,
    grant_type: "authorization_code",
    client_id: config.Google.clientId,
    client_secret: config.Google.clientSecret,
    redirect_uri: config.Google.redirectUri
  })
  .then(resp => resp.data).catch(err => false);
  if (!tokens || !tokens.refresh_token) return false;
  // get profile
  let profile = JSON.parse(Buffer.from(tokens.id_token.split(".")[1], 'base64').toString('ascii'));
  if (!profile.sub) return false;
  let name = profile.family_name + ", " + profile.given_name;
  let res = await user.Find({_id: profile.sub});
  if (!res.length) { // no current user
    await user.Insert(profile.sub, profile.email, name, tokens.refresh_token);
  } else { // update info
    await user.Update({_id: profile.sub}, {"$set": { email: profile.email, name: name, refresh_token: tokens.refresh_token }});
  }
  // generate token
  let t = token.Create(profile.sub);
  return {
    name: name,
    email: profile.email,
    token: t
  };
}