const restify = require('restify');
const skype = require('skype-sdk');
const builder = require('botbuilder');

var bot_id = process.env.bot_id || '655e0a0d-a998-4f26-aa5c-7310fdac1f11';
var app_id = process.env.app_id || '655e0a0d-a998-4f26-aa5c-7310fdac1f11';
var app_secret = process.env.app_secret || 'SRWy8ivbBacwOjSJ8axsCtP';

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

botService.on('contactAdded', (bot, data) => {
    bot.reply(`Hello ${data.fromDisplayName}!`, true);
});

botService.on('personalMessage', (bot, data) => {
  console.log('kitaaa1');
    bot.reply("hellooooo", true);
});
botService.on('Message', (bot, data) => {
    console.log('kitaaa2');
    bot.reply("hello", true);
});

// Setup Restify Server
const server = restify.createServer();
server.use(skype.ensureHttps(true));
// server.use(skype.verifySkypeCert({}));
const port = process.env.PORT || 8080;
server.post('/v1/chat', skype.messagingHandler(botService));
server.listen(port);
console.log('Listening for incoming requests on port ' + port);
