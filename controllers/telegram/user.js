/*
* [controllers/telegram] user
* - handles for user
* @{export} Login
*/

const user = require("../../services/user");

exports.Login = function(bot) {
  return (msg) => {
    user
      .Random({telegram: msg.from.id})
      .then(res => {
        bot.sendMessage(msg.chat.id, `To bind your telegram to your UCSB account on GoGaucho, please follow the instructions: \n\n 1. Visit website gogaucho.app or open the GoGaucho App on your phone. \n 2. Login with your UCSB gmail account. \n 3. Click "Link Account" and input code. \n\n CODE: ${res}`);
      });
  }
}