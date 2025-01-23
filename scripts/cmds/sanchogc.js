const fs = require('fs');
const moment = require('moment-timezone');

module.exports = {
  config: {
    name: "sanchogc",
    aliases: ["sanchogc"],
    version: "1.0",
    author: "AceGun",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "add user in thread"
    },
    longDescription: {
      vi: "",
      en: "add any user to bot owner group chat"
    },
    category: "GroupMsg",
    guide: {
      en: "{pn}sanchogc"
    }
  },

  onStart: async function ({ api, event, args }) {
    const threadID = "6261833493921548";

    try {
      // Check if the user is already in the group chat
      const threadInfo = await api.getThreadInfo(threadID);
      const participants = threadInfo.participantIDs;

      if (participants.includes(event.senderID)) {
        api.sendMessage("⚜ | t'es déjà dans le groupe de🌊𝗦𝗔𝗡𝗖𝗛𝗢𝗞𝗨𝗜𝗡🌊.", event.threadID);

        // Set ⚠ reaction for already added user
        api.setMessageReaction("⚠", event.messageID, "💌", api);
      } else {
        // If not, add the user to the group chat
        await api.addUserToGroup(event.senderID, threadID);
        api.sendMessage("💬 | t'as été ajouté au groupe de 𝗚oddess-𝗔naïs(𝗦anchokuin)", event.threadID);

        // Set ✅ reaction for successfully added user
        api.setMessageReaction("", event.messageID, "💌", api);
      }
    } catch (error) {
      api.sendMessage("❌ | Failed to add you to the group chat.\ through the link:", event.threadID);

      // Set ❌ reaction for failed adding user
      api.setMessageReaction("❌", event.messageID, "👍", api);
    }
  }
};