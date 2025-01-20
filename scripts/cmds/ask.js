const axios = require('axios');

const Prefixes = [
  'ask',
  '.chi',
  '¶sammy',
  '_nano',
  'nano',
  'ai',
  '.ask',
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
  '*ai',
  'gpt',
  '/gpt',
];

module.exports = {
  config: {
    name: 'ask',
    aliases: ["ai", "gpt"],
    version: '2.5',
    author: 'JV Barcenas',
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

      // Remove the prefix from the message body
      const prompt = event.body.substring(prefix.length).trim();

      // Check if prompt is empty
      if (prompt === '') {
        await message.reply(
          "✰ 𝗠𝗜𝗧𝗔𝗠𝗔💌 𝚎𝚜𝚝 𝙶𝚛𝚊𝚗𝚍 𝚙𝚕𝚞𝚜 𝚚𝚞𝚎 𝚟𝚊𝚢𝚊𝚗𝚝 ♡"
        );
        return;
      }

      // Send a message indicating that the question is being answered
      await message.reply("▣𝚆𝚊𝚒𝚝.........💬");

      const response = await axios.get(`https://chatgayfeyti.archashura.repl.co?gpt=${encodeURIComponent(prompt)}`);

      if (response.status !== 200 || !response.data) {
        throw new Error('Invalid or missing response from API');
      }

      const messageText = response.data.content.trim();

      await message.reply(messageText);

      console.log('Sent answer as a reply to user');
    } catch (error) {
      console.error(`Failed to get answer: ${error.message}`);
      api.sendMessage(
        `${error.message}.\n\nYou can try typing your question again or resending it, as there might be a bug from the server that's causing the problem. It might resolve the issue.`,
        event.threadID
      );
    }
  },
};

function formatFont(text) {
  const fontMapping = {
    a: "a",
    b: "b",
    c: "c",
    d: "d",
    e: "e",
    f: "f",
    g: "g",
    h: "h",
    i: "i",
    j: "j",
    k: "k",
    l: "l",
    m: "m",
    n: "n",
    o: "o",
    p: "p",
    q: "q",
    r: "r",
    s: "s",
    t: "t",
    u: "u",
    v: "v",
    w: "w",
    x: "x",
    y: "y",
    z: "z",
    A: "𝗔",
    B: "𝗕",
    C: "𝗖",
    D: "𝗗",
    E: "𝗘",
    F: "𝗙",
    G: "𝗚",
    H: "𝗛",
    I: "𝗜",
    J: "𝗝",
    K: "𝗞",
    L: "𝗟",
    M: "𝗠",
    N: "𝗡",
    O: "𝗢",
    P: "𝗣",
    Q: "𝗤",
    R: "𝗥",
    S: "𝗦",
    T: "𝗧",
    U: "𝗨",
    V: "𝗩",
    W: "𝗪",
    X: "𝗫",
    Y: "𝗬",
    Z: "𝗭"
  };

  let formattedText = "";
  for (const char of text) {
    if (char in fontMapping) {
      formattedText += fontMapping[char];
    } else {
      formattedText += char;
    }
  }
  return formattedText;
}        