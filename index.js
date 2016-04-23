const restify = require('restify');
const skype = require('skype-sdk');
const builder = require('botbuilder');

var bot_id = process.env.bot_id || 'e77a844b-17c1-4d4b-8238-6f680dc9373d';
var app_id = process.env.app_id || 'ebisu';
var app_secret = process.env.app_secret || 'e159fb9b61304f0e9148cd1e86a14b68';

// Initialize the BotService
const botService = new skype.BotService({
    messaging: {
        botId: bot_id,
        serverUrl : "https://apis.skype.com",
        requestTimeout : 15000,
        appId: app_id,
        appSecret: app_secret
    }
});

// Create bot and add dialogs
var bot = new builder.SkypeBot(botService);
bot.add('/', function (session) {
   session.send('Hello World');
   console.log('kita!!!');
});

// Setup Restify Server
const server = restify.createServer();
var port = process.env.PORT || 5000;
server.post('/api/messages', skype.messagingHandler(botService));
server.listen(port, function () {
   console.log('%s listening to %s', server.name, server.url);
});
