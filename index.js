const Discord = require("discord.js");
const { prefix, token } = require("./config.json");
const ytdl = require("ytdl-core");

const client = new Discord.Client();

const queue = new Map();

client.once("ready", () => {
  console.log("Ready!");
});

client.once("reconnecting", () => {
  console.log("Reconnecting!");
});

client.once("disconnect", () => {
  console.log("Disconnect!");
});

//------------------------

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const serverQueue = queue.get(message.guild.id);
  if (message.content.startsWith(`${prefix}summon`)) {
    summon(message, serverQueue);
    return;
  } else if (
    message.content.startsWith(`${prefix}`) &&
    message.content.length > 1
  ) {
    message.channel.send("~");
    return;
  } else {
    message.channel.send("na ni?");
    message.channel.send(
      "If you want to call me\n~play URL :play music\n~skip :skip music\n~stop :stop music"
    );
  }
});

async function summon(message, serverQueue) {
  const voiceChannel = message.member.voiceChannel;
  var connection = await voiceChannel.join(); //join channel
  queueContruct.connection = connection;
}

client.login(token);
