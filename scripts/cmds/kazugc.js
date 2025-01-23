 const fs = require('fs');
const moment = require('moment-timezone');

module.exports = {
  config: {
    name: "Kazugc",
    aliases: ["kazugc"],
    version: "1.0",
    author: "ᴛʜᴇᴀ",
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
      en: "exp:\n{pn}sanchogc"
    }
  },

  onStart: async function ({ api, event, args }) {
    const threadID = "5946537545447223";

    try {
      // Check if the user is already in the group chat
      const threadInfo = await api.getThreadInfo(threadID);
      const participants = threadInfo.participantIDs;

      if (participants.includes(event.senderID)) {
        api.sendMessage("⚜ | t'es déjà dans le groupe de ⚡𝗞ᴀᴢᴜ⚡.", event.threadID);

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