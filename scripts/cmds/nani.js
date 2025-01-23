const fs = require('fs');
module.exports = {
  config: {
    name: "nani",
    version: "1.0",
    author: "Thea",
    countDown: 5,
    role: 0,
    shortDescription: "no prefix",
    longDescription: "no prefix",
    category: "no prefix",
  },
  onStart: async function(){},
  onChat: async function({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "nani") {
      return message.reply({
        body: "『ಠωಠ』",
        attachment: fs.createReadStream("nani.mp3"),
      });
    }
  }
};