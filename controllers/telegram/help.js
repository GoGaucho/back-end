/*
* [controllers/telegram] help
* - handles for helps
* @{export} Start
*/

exports.Start = function(bot) {
  return (msg) => {
    let resp = `Welcome to the GoGaucho Bot! You can try the following command: \n\n \/me - Manage Identity. \n\n Have a nice day!`;
    bot.sendMessage(msg.chat.id, resp);
  }
}