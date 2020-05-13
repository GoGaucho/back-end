/*
* [controllers/telegram] help
* - handles for helps
* @{export} Start
*/

exports.Start = function(bot) {
  return (msg) => {
    let resp = "Welcome!";
    bot.sendMessage(msg.chat.id, resp);
  }
}