/*
* [services] user
* - user services
* @{export} Login - login with google oauth
* @{export} Refresh - refresh google oauth token
* @{export} Identity - get identity by other ways
* @{export} Random - generate random(cache) for binding
* @{export} Bind -  bind account
*/

"use strict";

const axios = require("axios");

const config = require("../config");
const user = require("../models/user");
const cache = require("../models/cache");
const time = require("../utils/time");
const token = require("../utils/token");

async function getToken(c, type = "authorization_code") {
  let body = {
    grant_type: type,
    client_id: config.Google.clientId,
    client_secret: config.Google.clientSecret,
    redirect_uri: config.Google.redirectUri
  };
  if (type == "authorization_code") body["code"] = c;
  else body["refresh_token"] = c;
  return await axios // get token
  .post("https://oauth2.googleapis.com/token", body)
  .then(resp => resp.data).catch(err => false);
}

function getProfile(jwt) {
  return JSON.parse(Buffer.from(jwt.split(".")[1], 'base64').toString('ascii'));
}

exports.Login = async function(code) {
  let tokens = await getToken(code);
  if (!tokens || !tokens.refresh_token) return false;
  // get profile
  let profile = getProfile(tokens.id_token);
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

exports.Refresh = async function(id) {
  let res = await user.Find({_id: id});
  if (!res.length) return false;
  let refreshToken = res[0].refresh_token;
  let tokens = await getToken(refreshToken, "refresh_token");
  if (!tokens || !tokens.id_token) return false;
  return tokens.id_token;
}

exports.Identity = async function(key, value) {
  let filter = {};
  filter[key] = value;
  let res = await user.Find(filter);
  if (!res.length) return false;
  else return res[0]._id;
}

exports.Random = async function(set) {
  let id = String(Math.random(0,10000)).substr(2,8);
  await cache.Insert(`RANDOM${id}`, time.Timestamp(), 300, 0, set);
  return id;
}

exports.Bind = async function(id, random) {
  let res = await cache.Find({_id: `RANDOM${random}`});
  if (!res.length) return false;
  if (res[0].life + res[0].timestamp < time.Timestamp()) return false;
  return await user.Update({_id: id}, {"$set": res[0].data});
}