const fs = require('fs');
module.exports = {
  config: {
    name: "prefix",
    version: "1.0",
    author: "Thea",
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: "",
    category: "ignore this command",
  },
  onStart: async function(){},
  onChat: async function({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "prefix") {
      return message.reply({
        body: "⁺◛˖▣𝗣𝗥𝗘𝗙𝗜𝗫 :「>」˖◛⁺\n𝗢𝗪𝗡𝗘𝗥:\n「🌷𝗠𝗜𝗧𝗔𝗠𝗔🌷」",
        attachment: fs.createReadStream("M22.jpg"),
      });
    }
  }
};