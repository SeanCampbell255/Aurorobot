const http = require('https');
const fs = require('fs');

module.exports = {
  name: 'autopost',
  description: 'set up autoposts with JSON embedding',
  usage: '',
  cooldown: 10,
  execute (message, args){
    const url = message.attachments.get(message.attachments.firstKey()).url;

    var file = fs.createWriteStream("./event_lists/file.json");
    var request = http.get(url, function(response){
      response.pipe(file);
    });
  }
}
