module.exports = {
  name: 'args-info',
  description: 'Info about the arguments passed.',
  guildOnly: true,
  args: true,
  usage: '<argument> <anotherArg> <asManyAsYouWant>',
  execute(message, args){
    if(args[0] === 'foo'){
      return message.channel.send('bar');
    }

    message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
  },
};
