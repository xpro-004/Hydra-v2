const axios = require('axios');

module.exports = {
  config: {
    name: "grammar",
    version: "1.0",
    author: "august quin",
    countDown: 8,
    role: 0,
    shortDescription: "",
    longDescription: "",
    category: "ai",
    guide: {
      en: "{pn} ",
    }
  },

  onStart: async function ({ api, args, event }) {
    try {
      const prompt = args.join(' ');

      if (!prompt) {
        api.sendMessage(
          'Hello! I am here to assist you with grammar analysis and corrections.',
          event.threadID,
          event.messageID
        );
        return;
      }

      api.sendMessage('Analyzing and crafting a response. Please wait....', event.threadID, event.messageID);

      const response = await axios.post('https://grammarai.august-api.repl.co/textanalysis', { prompt });

      if (response.status === 200 && response.data && response.data.answer) {
        const messageText = response.data.answer.trim();
        api.sendMessage(`💬 Grammar AI's Analysis and Correction: ${messageText}`, event.threadID, event.messageID);
      } else {
        throw new Error('Invalid or missing response from Grammar AI API');
      }
    } catch (error) {
      console.error(`Failed to get an answer: ${error.message}`);
      api.sendMessage(`Error: ${error.message}. An error occurred; please try again later.`, event.threadID, event.messageID);
    }
  }
};