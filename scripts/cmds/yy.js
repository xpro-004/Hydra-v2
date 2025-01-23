const fs = require('fs');
module.exports = {
  config: {
    name: "maman",
    version: "1.0",
    author: "Otineeeeeyyyyyy",
    countDown: 5,
    role: 0,
    shortDescription: "no prefix",
    longDescription: "no prefix",
    category: "no prefix",
  },
  onStart: async function(){},
  onChat: async function({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "bebe d'amour") {
      return message.reply({
        body: "『😘😘😘』",
        attachment: fs.createReadStream("uuu.mp3"),
      });
    }
  }
};