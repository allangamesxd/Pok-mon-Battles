const Discord = require("discord.js"); // Conectando ao discord
const express = require("express"); // Conectando com a host
const { QuickDB } = require("quick.db");
const data = new QuickDB(); // conectando com a database
const fs = require("node:fs") // Leitor de arquivo
const clientInfo = {prefix: "b!", token: process.env.TOKEN} // Informações do bot

const client = new Discord.Client({intents: 3276799, shards: "auto"});
client.login(clientInfo.token)
client.on("ready", async() => { // Caso o bot esteja pronto...
  console.clear();
  console.table([{tag: client.user.tag, id: client.user.id, status: "Pronto"}]);
});

client.commands = new Discord.Collection(); // Representa os comandos
client.aliases = new Discord.Collection(); // Representa os sinônimos

fs.readdirSync('./commands').forEach(dir => {
  let commands = fs.readdirSync("./commands/"+dir).filter(file => file.endsWith('.js'));

  for(let file of commands) {
   let Push = require(`./commands/${dir}/${file}`); // Pegando dados dos comandos

    if (Push.name) {
      client.commands.set(Push.name, Push)
    }
    if (Push.aliases && Array.isArray(Push.aliases))
      Push.aliases.forEach(x => client.aliases.set(x, Push.name))
   
  }
});
