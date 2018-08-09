//requires discord.js
const Discord = require('discord.js');

//require config file
const {prefix, token} = require('./config.json');
//starts new Discord client
const client = new Discord.Client();

//logs to console when the bot is up
client.on('ready', () => {
    console.log('Ready!');
});

//reads all messages
client.on('message', message => {
  //!ping gets response 'Pong.'
    if (message.content === `${prefix}ping`){
      message.channel.send('Pong. ' + message.guild.name);
    }
});

//gets the token from config, logs bot into Discord
client.login(token);
