/*
* [services] oauth
* - google oauth services
* @{export} GetAuthUrl
* @{export} GetToken
*/

"use strict"

const config = require("../config");
const { google } = require('googleapis');

function getClient(redirect) {
  return new google.auth.OAuth2(
    config.keys.OAUTH_CLIENT_ID,
    config.keys.OAUTH_SECRET,
    redirect);
}

const defaultClient = getClient("https://gogaucho.app");

exports.DefaultScopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
  "openid"];

function getAuthUrl(refresh, redirect, scopes) {
  return getClient(redirect).generateAuthUrl({
    access_type: refresh ? 'offline' : 'online',
    scope: scopes
  });
}

async function getToken(code) {
  const { tokens } = await defaultClient.getToken(code);
  return tokens.id_token;
}

exports.GetAuthUrl = getAuthUrl;
exports.GetToken = getToken;