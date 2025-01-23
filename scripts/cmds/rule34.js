const axios = require('axios');
const fs = require('fs');
const request = require('request');
const xml2js = require('xml2js');

module.exports = {
  config: {
    name: "rule34",
    version: "1",
    role: 0,
    credits: "Jonell Magallanes",
    shortDescription: {
      en: "Send rule34 image"
    },
    longDescription: {
      en: "Send a random image from rule34."
    },
    category: "NSFW",
    guide: {
      en: "/rule34"
    },
    cooldowns: 10
  },
  onStart: async function ({ api, event }) {
    const parser = new xml2js.Parser();
    try {
      const response = await axios.get(`https://rule34.xxx/index.php?page=dapi&s=post&q=index`);
      api.sendMessage("📪 | 𝚂𝚎𝚗𝚍𝚒𝚗𝚐 𝚆𝚊𝚒𝚝...", event.threadID); 
      parser.parseStringPromise(response.data).then((result) => {
        const posts = result.posts.post;
        const randomPost = posts[Math.floor(Math.random() * posts.length)];
        
        let callback = function () {
          api.sendMessage({
            body: `🥵 | Random  / 𝗥𝗨𝗟𝗘𝗦34`,
            attachment: fs.createReadStream(__dirname + `/cache/rule34.jpg`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/rule34.jpg`), event.messageID);
        };
        
        request(randomPost.$.file_url).pipe(fs.createWriteStream(__dirname + `/cache/rule34.jpg`)).on("close", callback);
      });
    } catch (error) {
      console.error('Error:', error);
      api.sendMessage("⚙ | Error Api Of Rule34 command, please try again later", event.threadID, event.messageID);
      api.setMessageReaction("❌", event.messageID, (err) => {}, true);
    }
  }
};