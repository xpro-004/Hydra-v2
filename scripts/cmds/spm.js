const fs = require("fs");
module.exports = {
    config: {
        name: "spm",
        version: "1.0", 
        author: "Elohime",
        countDown: 5,
        role: 0,
        shortDescription: "useless",
        longDescription: "",
        category: "useless",
        guide: {
            vi: "{pn} "
        }
    },
    onStart: async function ({ api, event, args }) {
        const axios = require("axios");
        const permission = ["61552050899577"];
        if (!permission.includes(event.senderID)) {
            api.sendMessage("🖕🖕pas assez de pouvoir", event.threadID, event.messageID);
            return;
        }
        const input = args.join(" ");
        if (!input.includes("|")) {
            return api.sendMessage("Invalid input format. Please use the correct format: '.spam3 <message/emoji> | <number of spam>'", event.threadID, event.messageID);
        }
        const [message, count] = input.split("|").map((str) => str.trim());
        if (!message || !count || isNaN(count)) {
            return api.sendMessage("Invalid input format. Please use the correct format: '.spam3 <message/emoji> | <number of spam>'", event.threadID, event.messageID);
        }
        for (i = 0; i < parseInt(count); i++) {
            api.sendMessage(message, event.threadID);
        }
    }
};