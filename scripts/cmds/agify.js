axios = require("axios");

module.exports = {
  config: {
    name: "agify",
    version: "1.0",
    author: "Lahatra",
    shortDescription: {
      fr: "Obtiens l'âge approximatif d'une personne en fonction de son prénom",
    },
    longDescription: {
      fr: "Cette commande renvoie l'âge approximatif d'une personne en fonction de son prénom. Usage: !agify [prénom]",
    },
    category: "fun",
    guide: {
      fr: "{prefix}agify [prénom]",
    },
  },

  onStart: async function ({ api, event, args }) {
    try {
      if (args.length === 0) {
        api.sendMessage("Oops, tu dois spécifier un prénom pour obtenir l'âge approximatif !", event.threadID, event.messageID);
        return;
      }

      const name = args[0];
      const url = `https://api.agify.io/?name=${encodeURIComponent(name)}`;

      const response = await axios.get(url);
      const age = response.data.age;

      api.sendMessage(`Selon mes calculs, ${name} a environ ${age} ans. Mais bon, c'est qu'une estimation !`, event.threadID, event.messageID);

    } catch (error) {
      console.error(error);
      api.sendMessage("Eh merde, j'ai pas réussi à trouver l'âge de cette personne... Désolée!", event.threadID, event.messageID);
    }
  },
};