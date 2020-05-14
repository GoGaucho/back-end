/*
* [controllers/telegram]
* Start telegram-bot listener
* Routers
*/

"use strict";

const TelegramBot = require('node-telegram-bot-api');

const config = require("../../config");

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(config.telegram.token, {polling: true});

// all modules
let m = {
  help: require("./help"),
  user: require("./user")
}

// Router
// help
bot.onText(/^\/start/, m.help.Start(bot));
// user
bot.onText(/^\/me/, m.user.Me(bot));
bot.onText(/^\/login/, m.user.Login(bot));
bot.onText(/^\/logout/, m.user.Logout(bot));