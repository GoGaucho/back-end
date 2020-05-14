/*
* [controllers/telegram] user
* - handles for user
* @{export} Me
* @{export} Login
* @{export} Logout
*/

"use strict";

const user = require("../../services/user");

exports.Me = function(bot) {
  return (msg) => {
    user
      .Identity("telegram", msg.from.id)
      .then(res => {
        if (!res) {
          bot.sendMessage(msg.chat.id, "You have not logged in. Try \/login");
          return;
        }
        let name = res.name.split(",");
        bot.sendMessage(msg.chat.id, `You are currently logged in as ${name[1]} ${name[0]}. Use \/logout to logout.`);
      });
  }
}

exports.Login = function(bot) {
  return (msg) => {
    user
      .Random({telegram: msg.from.id})
      .then(res => {
        bot.sendMessage(msg.chat.id, `To bind your telegram to your UCSB account on GoGaucho, please follow the instructions: \n\n 1. Visit website gogaucho.app or open the GoGaucho App on your phone. \n 2. Login with your UCSB gmail account. \n 3. Click "Link Account" and input code. \n\n CODE: ${res}\n (valid for only 5 minutes)`);
      });
  }
}

exports.Logout = function(bot) {
  return (msg) => {
    user
      .Identity("telegram", msg.from.id)
      .then(res => {
        if (!res) {
          bot.sendMessage(msg.chat.id, "You have not logged in.");
          return;
        }
        user
          .Unbind(res._id, "telegram")
          .then(res => {
            if (res) bot.sendMessage(msg.chat.id, `Logged out.`);
            else bot.sendMessage(msg.chat.id, `Fail`);
          });
      })
      .catch(err => {
        bot.sendMessage(msg.chat.id, `Fail`);
      });
  }
}