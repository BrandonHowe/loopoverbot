const Discord = require('discord.js');
const { prefix, token } = require('./auth.json');
const client = new Discord.Client();
const fs = require('fs');
 
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
});

client.on('message', msg => {
    mention = msg.mentions.users.first();
    if (msg.content.startsWith(`${prefix}hi`)) {
        msg.channel.send('Why hello there!')
    }
    if (msg.content.startsWith(`${prefix}leaderboards 5x5`)) {
        msg.channel.send('1. ZManGames - 8.100\n2. David Jiang - 9.002\n3. Dawid Wojcik - 9.226\n4. no name guy - 11.772\n5. Carykh - 12.346')
    }
    if (msg.content.startsWith(`${prefix}leaderboards 6x6`)) {
        msg.channel.send('1. ZManGames - 18.400\n2. Dawid Wojcik - 21.592\n3. David Jiang - 22.239\n4. Walker Welch - 26.462\n5. Carykh - 26.864')
    }
});

client.login(token);