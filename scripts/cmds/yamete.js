const fs = require('fs');
module.exports = {
  config: {
    name: "Yamete",
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
    if (event.body && event.body.toLowerCase() === "Yamete") {
      return message.reply({
        body: "『(。-`ω´-)』",
        attachment: fs.createReadStream("Yamate.mp3"),
      });
    }
  }
};