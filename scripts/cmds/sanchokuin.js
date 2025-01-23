const fs = require('fs');
module.exports = {
  config: {
    name: "yame",
    version: "1.0",
    author: "Thea",
    countDown: 5,
    role: 0,
    shortDescription: "my Queen",
    longDescription: "no prefix",
    category: "no prefix",
  },
  onStart: async function(){},
  onChat: async function({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "sanchokuin") {
      return message.reply({
        body: "🌸 ʜᴇʟʟ♡ ( ╹▽╹ )🌸\nɪ'ᴍ 🌊sᴀɴᴄʜ♡ᴋᴜɪɴ🌊\n⊰᯽⊱┈──╌❊╌──┈⊰᯽⊱\n➤✨ғᴏʟʟᴏᴡ ♡ᴜʀ 𝗤𝗨𝗘𝗘𝗡🌷\n》》『𝘎♡𝘥𝘥𝘦𝘴𝘴-𝘈𝘯𝘢𝘪𝘴』\n⊰ 𝗟𝗜𝗡𝗞:https://www.facebook.com/GoddessAnais.Aesther\n╚══════════╝",
        attachment: fs.createReadStream("sanchokuin.mp4"),
      });
    }
  }
};