var restify = require('restify');
var builder = require('botbuilder');

var bot_id = process.env.bot_id || '655e0a0d-a998-4f26-aa5c-7310fdac1f11';
var app_id = process.env.APP_ID || 'ebisu';
var app_secret = process.env.APP_SECRET || 'e159fb9b61304f0e9148cd1e86a14b68';

// Create bot and add dialogs
var bot = new builder.BotConnectorBot({ appId: 'YourAppId', appSecret: 'YourAppSecret' });
bot.add('/', function (session) {
    session.send('Hello World');
});

// Setup Restify Server
var server = restify.createServer();
server.post('/api/messages', bot.verifyBotFramework(), bot.listen());
const port = process.env.PORT || 3978;
server.listen(port, function () {
    console.log('%s listening to %s', server.name, server.url); 
});