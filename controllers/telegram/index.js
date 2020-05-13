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
  help: require("./help")
}

bot.onText(/^\/start/, m.help.Start(bot));