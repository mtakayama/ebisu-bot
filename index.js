var express = require('express');
var app = express();

// Create bot and add dialogs
var bot = new builder.BotConnectorBot({ appId: process.env.app_id, appSecret: process.env.app_secret });
bot.add('/', function (session) {
    session.send('Hello World');
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
