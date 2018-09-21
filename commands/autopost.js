const http = require('https');
const fs = require('fs');
const autoposter = require('autoposter.js');

module.exports = {
  name: 'autopost',
  description: 'set up autoposts with JSON embedding',
  usage: '',
  cooldown: 10,
  execute (message, args){
    //Grabs the URL for embeded content
    const url = message.attachments.get(message.attachments.firstKey()).url;

    //Writes JSON to file from Discord file hosting
    var file = fs.createWriteStream("./event_lists/file.json");
    var request = http.get(url, function(response){
      response.pipe(file);
    });
  }
}
