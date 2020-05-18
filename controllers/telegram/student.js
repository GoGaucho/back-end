/*
* [controllers/telegram] student
* - handles for student
* @{export} Pass
*/

"use strict";

const user = require("../../services/user");
const student = require("../../services/student");

exports.Pass = function(bot) {
  return async (msg) => {
    let u = await user.Identity("telegram", msg.from.id);
    if (!u) {
      bot.sendMessage(msg.chat.id, "You have not logged in. Try \/login");
      return;
    }
    let token = await user.Refresh(u._id);
    if (!token) {
      bot.sendMessage(msg.chat.id, "Your identity is expired. Please go to website gogaucho.app or GoGaucho App and login with your UCSB gmail account.");
      return;
    }
    let res = await student.Registration(token);
    if (!res) {
      bot.sendMessage(msg.chat.id, "Fail to get your Registration Information.");
      return;
    }
    bot.sendMessage(msg.chat.id, JSON.stringify(res));
  }
}