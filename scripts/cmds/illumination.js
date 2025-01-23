const fs = require('fs');
module.exports = {
  config: {
    name: "Illuminati",
    version: "1",
    author: "Thea",
    countDown: 5,
    role: 0,
    shortDescription: "no prefix",
    longDescription: "no prefix",
    category: "no prefix",
  },
  onStart: async function(){},
  onChat: async function({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "illumination") {
      return message.reply({
        body: "『( O o O )』",
        attachment: fs.createReadStream("illuminati.m4a"),
      });
    }
  }
};