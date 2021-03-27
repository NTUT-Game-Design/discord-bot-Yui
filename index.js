const Discord = require("discord.js");
const { prefix, token } = require("./config.json");
const { commands: c } = require("./commands.json");

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

  if (message.content.startsWith(`${prefix} ` + c.transfer)) {
    Transfer(message);
  }
  if (message.content.startsWith(`${prefix} ` + c.fcdis)) {
    DisconnectSomeOne(message);
  }
});

async function Transfer(message) {
  let roleName = message.content.split(`${prefix} ` + c.transfer + " ")[1];
  // console.log(message.guild.roles.cache);

  let role = message.member.guild.roles.cache.find(
    (role) => role.name === roleName
  );
  if (role) message.guild.members.cache.get(message.author.id).roles.add(role);
}

async function DisconnectSomeOne(message) {
  let targetName = message.content.split(`${prefix} ` + c.fcdis + " ")[1];

  let n = "";
  client.users.cache.forEach((user) => {
    if (user.username == targetName) {
      n = user;
    }
  });
  console.log();
  let member = await message.guild.members.fetch(n.id);

  let id = member.user.id;
  message.guild.member(id).voice.setChannel(null);

  // Other way to disconnect user
  // {member.voice.setChannel(null).catch((err) => console.log(err));}
  // {message.member.voice.setChannel(null).catch((err) => console.log(err));}
  // {if (targetName) message.guild.member(targetName).voice.setChannel(null);}
}

client.login(token);
