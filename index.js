var restify = require('restify');
var builder = require('botbuilder');

app.set('port', (process.env.PORT || 5000));

// Create bot and add dialogs
var bot = new builder.BotConnectorBot({ appId: 'ebisu', appSecret: 'e159fb9b61304f0e9148cd1e86a14b68' });
bot.add('/', function (session) {
    session.send('Hello World');
});

// Setup Restify Server
var server = restify.createServer();
server.post('/api/messages', bot.verifyBotFramework(), bot.listen());
server.listen(app.get('port'), function () {
    console.log('%s listening to %s', server.name, server.url);
});
