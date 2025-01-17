const axios = require("axios");
const baseApiUrl = async () => {

  return base.data.api;
};

module.exports.config = {
  name: "math",
  version: "1.0.1",
  hasPermission: 0,
  credits: "MewMew",
  description: "Solve mathematical problems using WolframAlpha API",
  commandCategory: "general",
  usages: "math 1 + 2",
  cooldowns: 5,
  dependencies: ["axios"],
  info: [
    {
      key: 'none',
      prompt: '',
      type: 'Math Expression',
      example: 'math x+1=2'
    },
    {
      key: '-p',
      prompt: 'Indefinite Integral',
      type: 'Math Expression',
      example: 'math -p xdx'
    },
    {
      key: '-p',
      prompt: 'Definite Integral',
      type: 'Math Expression',
      example: 'math -p xdx from 0 to 2'
    },
    {
      key: '-g',
      prompt: 'Graph Plot',
      type: 'Math Expression',
      example: 'math -g y = x^3 - 9'
    },
    {
      key: '-v',
      prompt: 'Vector',
      type: 'Coordinates',
      example: 'math -v (1, 2, 3) - (5, 6, 7)'
    }
  ],
  envConfig: {
    "WOLFRAM": "T8J8YV-H265UQ762K"
  }
};

module.exports.run = async function (client, message, args) {
  const key = process.env.WOLFRAM; // Use environment variable for the Wolfram API key
  let content = args.join(" ");
  if (message.reply) {
    content = message.reply.content;
  }

  if (!content) {
    return client.sendMessage("Please enter a mathematical expression.", message.channelID);
  }

  // Indefinite and Definite Integrals
  if (content.startsWith("-p")) {
    try {
      content = "primitive " + content.slice(3);
      const { data } = await axios.get(`http://api.wolframalpha.com/v2/query?appid=${key}&input=${encodeURIComponent(content)}&output=json`);
      
      if (content.includes("from") && content.includes("to")) {
        const value = data.queryresult.pods.find(e => e.id === "Input").subpods[0].plaintext;
        if (value.includes("≈")) {
          const [fraction, decimal] = value.split("≈");
          const [_, fractionValue] = fraction.split(" = ");
          return client.sendMessage(`Fractional: ${fractionValue}\nDecimal: ${decimal}`, message.channelID);
        } else {
          return client.sendMessage(value.split(" = ")[1], message.channelID);
        }
      } else {
        return client.sendMessage(data.queryresult.pods.find(e => e.id === "IndefiniteIntegral").subpods[0].plaintext.split(" = ")[1].replace("+ constant", ""), message.channelID);
      }
    } catch (error) {
      return client.sendMessage(`Error: ${error.message}`, message.channelID);
    }
  }

  // Graph Plot
  else if (content.startsWith("-g")) {
    try {
      content = "plot " + content.slice(3);
      const { data } = await axios.get(`http://api.wolframalpha.com/v2/query?appid=${key}&input=${encodeURIComponent(content)}&output=json`);
      const src = data.queryresult.pods.find(e => e.id === "Plot")?.subpods[0].img.src || data.queryresult.pods.find(e => e.id === "ImplicitPlot")?.subpods[0].img.src;

      if (src) {
        const img = (await axios.get(src, { responseType: 'stream' })).data;
        img.pipe(fs.createWriteStream("./graph.png")).on("close", () => {
          client.sendMessage({ attachment: fs.createReadStream("./graph.png") }, message.channelID, () => fs.unlinkSync("./graph.png"));
        });
      } else {
        return client.sendMessage("Graph not found.", message.channelID);
      }
    } catch (error) {
      return client.sendMessage(`Error: ${error.message}`, message.channelID);
    }
  }

  // Vector Operations
  else if (content.startsWith("-v")) {
    try {
      content = "vector " + content.slice(3).replace(//g, "<").replace(//g, ">");
      const { data } = await axios.get(`http://api.wolframalpha.com/v2/query?appid=${key}&input=${encodeURIComponent(content)}&output=json`);
      const vectorLength = data.queryresult.pods.find(e => e.id === "VectorLength")?.subpods[0].plaintext;
      const result = data.queryresult.pods.find(e => e.id === "Result")?.subpods[0].plaintext;
      const src = data.queryresult.pods.find(e => e.id === "VectorPlot")?.subpods[0].img.src;

      if (src) {
        const img = (await axios.get(src, { responseType: 'stream' })).data;
        img.pipe(fs.createWriteStream("./vector_plot.png")).on("close", () => {
          client.sendMessage({
            body: (result ? result + "\nVector Length: " + vectorLength : ""),
            attachment: fs.createReadStream("./vector_plot.png")
          }, message.channelID, () => fs.unlinkSync("./vector_plot.png"));
        });
      } else {
        return client.sendMessage("Vector plot not found.", message.channelID);
      }
    } catch (error) {
      return client.sendMessage(`Error: ${error.message}`, message.channelID);
    }
  }

  // General Math Expressions
  else {
    try {
      const { data } = await axios.get(`http://api.wolframalpha.com/v2/query?appid=${key}&input=${encodeURIComponent(content)}&output=json`);
      if (data.queryresult.pods.some(e => e.id === "Solution")) {
        const solutions = data.queryresult.pods.find(e => e.id === "Solution");
        let response = solutions.subpods.map(sub => sub.plaintext).join("\n");
        return client.sendMessage(response, message.channelID);
      } else if (data.queryresult.pods.some(e => e.id === "ComplexSolution")) {
        const complexSolutions = data.queryresult.pods.find(e => e.id === "ComplexSolution");
        let response = complexSolutions.subpods.map(sub => sub.plaintext).join("\n");
        return client.sendMessage(response, message.channelID);
      } else if (data.queryresult.pods.some(e => e.id === "Result")) {
        return client.sendMessage(data.queryresult.pods.find(e => e.id === "Result").subpods[0].plaintext, message.channelID);
      } else {
        return client.sendMessage("No solution found.", message.channelID);
      }
    } catch (error) {
      return client.sendMessage(`Error: ${error.message}`, message.channelID);
    }
  }
};
