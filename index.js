var restify = require('restify');
var builder = require('botbuilder');

var bot_id = process.env.bot_id || '28:655e0a0d-a998-4f26-aa5c-7310fdac1f11';
var app_id = process.env.app_id || 'ebisu';
var app_secret = process.env.app_secret || 'e159fb9b61304f0e9148cd1e86a14b68';

// Create bot and add dialogs
var bot = new builder.BotConnectorBot({ appId:app_id, appSecret: app_secret });
bot.add('/', function (session) {
    session.send('hello!!!!');
});


var server = restify.createServer();

server.post('/api/messages', bot.verifyBotFramework(), bot.listen());

var port = process.env.PORT || 5000;
server.listen(port, function () {
    console.log('%s listening to %s', server.name, server.url);
});
