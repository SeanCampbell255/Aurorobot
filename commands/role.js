const roles = require('../available-roles.json');

module.exports = {
  name: 'role',
  description: 'Assign yourself a role. You can see roles in \`Server Settings -> Roles\`. You can remove roles from yourself at any time (click your username in the list on the right in the server).',
  guildOnly: true,
  args: true,
  usage: '\`!role <desired role>\`',
  execute(message, args){
    let reqRole = args[0];
    let flag = false; //check if role was set

    for(var i = 1; i < args.length; i++){
      reqRole += " " + args[i];
    }

    roles.available.forEach(function(role){
      if (role == reqRole){
        applyRole(role);
        flag = true;
        return;
      }
    });

    //Case where role is not found
    if(!flag){
      message.reply("Role does not exist or not available to self-assign, check \`Server Settings -> Roles\` for a list of roles")
    }
    //Turns role's name to actual role obj & applies to msg author
    function applyRole(roleName){
      const role = message.guild.roles.find(r => r.name === roleName);

      message.member.addRole(role).catch(console.error);
      message.reply("Success!");
    }
  },
};
