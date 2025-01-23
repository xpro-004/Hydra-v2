const fs = require('fs');
module.exports = {
  config: {
    name: "tatakae",
    version: "1.1",
    author: "Thea",
    countDown: 5,
    role: 0,
    shortDescription: "no prefix",
    longDescription: "just no prefix",
    category: "no prefix",
  },
  onStart: async function(){},
  onChat: async function({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "tatakae") {
      return message.reply({
        body: "『TATAKAEEEE!!!』",
        attachment: fs.createReadStream("cena.mp3"),
      });
    }
  }
};