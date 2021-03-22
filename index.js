const Discord = require("discord.js");
const { prefix, token } = require("./config.json");

const client = new Discord.Client();

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

  if (message.content.startsWith(`${prefix} transfer`)) {
    Transfer(message);
  }
});

async function Transfer(message) {
  let roleName = message.content.split(`${prefix} transfer `)[1];
  let role = message.member.guild.roles.cache.find(
    (role) => role.name === roleName
  );
  if (role) message.guild.members.cache.get(message.author.id).roles.add(role);
}

client.login(token);
