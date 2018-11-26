const fs = require('fs');
const Discord = require('discord.js');

//require config file
const {prefix, token} = require('./config.json');
//access multiple welcome messages
const {aurora, ggj} = require('./welcomes.json');
//starts new Discord client
const client = new Discord.Client();

//Creates a collection from the /commands folder's command scripts
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles){
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

//Collection for command cooldowns
const cooldowns = new Discord.Collection();

//logs to console when the bot is up
client.on('ready', () => {
  client.user.setActivity('!help');
  console.log('Ready!');
});

//Triggered on every new message
client.on('message', message => {
  //Ignores messages sent by bot or lacking a prefix
  if(!message.content.startsWith(prefix) || message.author.bot) return;

  //Turns message into array, seperates by spaces
  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  //Tells user if command doesn't exist
  if(!client.commands.has(commandName)){
    message.reply(`that doesn't seem to be a command`);
    return;
  }

  //Gets the command object
  const command = client.commands.get(commandName);

  //Tells user if command can't be used in DMs
  if(command.guildOnly && message.channel.type !== 'text'){
    return message.reply('I can\'t execute that command inside DMs!');
  }

  //Tells user if command doesn't have necessary Arguments
  if(command.args && !args.length){
    let reply = `You didn't provide any arguments, ${message.author}!`;

    //Displays proper syntax
    if(command.usage){
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }

  //COOLDOWN FOR COMMANDS
  if(!cooldowns.has(command.name)){
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps  = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if(!timestamps.has(message.author.id)){
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  }
  else{
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if(now < expirationTime){
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`
                            ${command.name}\` command.`);
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmmount);
  }

  //Executes command, error message for unexpected error
  //try{
    command.execute(message, args);
  // }
  // catch (error) {
  //   console.error(error);
  //   message.reply('there was an error trying to execute that command!');
  // }
});

//Triggered on every new server member
client.on('guildMemberAdd', member => {
  var dmWelcome = ' ';
  var channel;

  channel = member.guild.channels.find(ch => ch.name === 'welcome');
  const serverWelcome = `${member}` + aurora[0];
  dmWelcome = aurora[1];

  channel.send(serverWelcome, {split: true});

  member.send(dmWelcome, {split: true})
    .catch(error => {
      console.error(`Could not send help DM to ${member}.\n`, error);
      channel.send(`It seems like I can't DM you @${member}! Do you have DMs disabled?`);
    });
});

//gets the token from config, logs bot into Discord
client.login(token);
