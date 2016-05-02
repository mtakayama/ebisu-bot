
const restify = require('restify');
const skype = require('skype-sdk');
const builder = require('botbuilder');

var bot_id = process.env.bot_id || '655e0a0d-a998-4f26-aa5c-7310fdac1f11';
var app_id = process.env.app_id || 'ebisu';
var app_secret = process.env.app_secret || 'e159fb9b61304f0e9148cd1e86a14b68';

// Initialize the BotService
const botService = new skype.BotService({
    messaging: {
        botId: "28:<bot’s id>",
        serverUrl : "https://apis.skype.com",
        requestTimeout : 15000,
        appId: app_id,
        appSecret: app_secret
    }
});

var bot = new builder.SkypeBot(botService);
bot.add('/', function (session) {
  console.log('Hello skype bot');
  session.send('Hello skype bot');
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
server.use(skype.verifySkypeCert({}));
const port = process.env.PORT || 8080;
server.post('/api/messages', skype.messagingHandler(botService));
server.listen(port, function () {
   console.log('%s listening to %s', server.name, server.url);
});
