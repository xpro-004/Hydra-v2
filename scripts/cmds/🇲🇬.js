const fs = require('fs');
module.exports = {
  config: {
    name: "flag",
    version: "1",
    author: "Thea",
    countDown: 5,
    role: 0,
    shortDescription: "Thea Pic",
    longDescription: "no prefix",
    category: "no prefix",
  },
  onStart: async function(){},
  onChat: async function({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "🇲🇬") {
      return message.reply({
        body: "🇲🇬𝗔nja🌸:𝗧hea/𝗔esther🇲🇬",
        attachment: fs.createReadStream("anja.jpg"),
      });
    },
  }