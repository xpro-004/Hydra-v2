const axios = require('axios');

const Prefixes = [
  '*',
  '😡',
  'Ai',
  '_nano',
  '@',
  'gpt',
  '×',
  '/ask',
  '!ask',
  '@ask',
  '#ask',
  '$ask',
  '%ask',
  '^ask',
  '*ask',
  '.ai',
  '/ai',
  '!ai',
  '@ai',
  '#ai',
  '$ai',
  '%ai',
  '^ai',
  '*ai'
];

module.exports = {
  config: {
    name: 'ra',
    aliases: ["x"],
    version: '2.5',
    author: 'Thea',
    role: 0,
    category: 'utility',
    shortDescription: {
      en: 'Asks an AI for an answer.',
    },
    longDescription: {
      en: 'Asks an AI for an answer based on the user prompt.',
    },
    guide: {
      en: '{pn} [prompt]',
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));

      // Check if the prefix is valid
      if (!prefix) {
        return; // Invalid prefix, ignore the command
      }

      const q = args.join("☁️");
api.setMessageReaction("", event.messageID, () => {}, true);
      try {
        const response = await axios.post("https://catgpt.guru/api/chat", {
          messages: [
            {
              role: "user",
              content: q,
            },
          ],
        });
    api.setMessageReaction("🌩️", event.messageID, () => {}, true);  api.sendMessage(response.data, event.threadID, event.messageID);
      } catch (error) {
        console.error(error);
        api.sendMessage('', event.threadID, event.messageID);
      }
    } catch (error) {
      console.error(error);
    }
  }
};