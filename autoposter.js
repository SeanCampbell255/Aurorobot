const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
  run: function(){
    for(const file of postFiles){
      var content = fs.readFileSync('./autopost_jsons/' + file);
      makePostObjs(content);
    }
  }
}

var posts = new Discord.Collection();
const postFiles = fs.readdirSync('./autopost_jsons').filter(file => file.endsWith('.json'));

function makePostObjs(file){

}
