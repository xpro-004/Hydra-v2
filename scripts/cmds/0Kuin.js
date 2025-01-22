const axios = require('axios');

let lastQuery = "";

module.exports = {
	config: {
		name: "Ae",
    aliases: ["Ae2","Aesther"],
		version: "1.0",
		author: "Thea",//Api By Hazeyy
		countDown: 5,
		role: 0,
		shortDescription: "Assistante personnel de Thea",
		longDescription: "",
		category: "ai",
		guide: "{pn}"
	}, 
	onStart: async function({ api, event, args }) {
		const { threadID, messageID } = event;

		if (!args[0]) {
			api.sendMessage("(◍•ᴗ•◍)??𝗤𝗨𝗘𝗦𝗧𝗜𝗢𝗡𝗦✰?", threadID, messageID);
			return;
		}

		const query = args.join(" ");

		if (query === lastQuery) {
			api.sendMessage("", threadID, messageID);
			return;
		} else {
			lastQuery = query;
		}

		api.sendMessage("", threadID, messageID);

		try {
			const response = await axios.get(`https://hazeyy-api-blackbox.kyrinwu.repl.co/ask?q=${encodeURIComponent(query)}`);

			if (response.status === 200 && response.data && response.data.message) {
				const answer = response.data.message;
				const formattedAnswer =formatFont(answer); // Apply font formatting
				api.sendMessage(formattedAnswer, threadID, messageID);
			} else {
				api.sendMessage("😿 𝖲𝗈𝗋𝗋𝗒, 𝖭𝗈 𝗋𝖾𝗅𝖾𝗏𝖺𝗇𝗍 𝖺𝗇𝗌𝗐𝖾𝗋𝗌 𝖿𝗈𝗎𝗇𝖽..", threadID, messageID);
			}
		} catch (error) {
			console.error(error);
			api.sendMessage("😿 𝖴𝗇𝖾𝗑𝗉𝖾𝖼𝗍𝖾𝖽 𝖤𝗋𝗋𝗈𝗋, 𝖶𝗁𝗂𝗅𝖾 𝗌𝖾𝖺𝗋𝖼𝗁𝗂𝗇𝗀 𝖺𝗇𝗌𝗐𝖾𝗋 𝗈𝗇 𝖯𝗁𝗒𝗍𝗈𝗇 𝖠𝖨...", threadID, messageID);
			return;
		}
	}
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