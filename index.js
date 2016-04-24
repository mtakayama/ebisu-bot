const restify = require('restify');
const skype = require('skype-sdk');
const builder = require('botbuilder');

var bot_id = process.env.bot_id || '655e0a0d-a998-4f26-aa5c-7310fdac1f11';
var app_id = process.env.app_id || '655e0a0d-a998-4f26-aa5c-7310fdac1f11';
var app_secret = process.env.app_secret || 'SRWy8ivbBacwOjSJ8axsCtP';

// Initialize the BotService
const botService = new skype.BotService({
    messaging: {
        botId: '28:<bot’s id="">',
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
    bot.reply(`Hey ${data.from}. Thank you for your message: "${data.content}".`, true);
});

// Setup Restify Server
const server = restify.createServer();
// server.use(skype.ensureHttps(true));
// server.use(skype.verifySkypeCert({}));
const port = process.env.PORT || 8080;
server.post('/api/messages', skype.messagingHandler(botService));
server.listen(port, function () {
   console.log('%s listening to %s', server.name, server.url);
});
