var restify = require('restify');
var builder = require('botbuilder');
console.log('kita');

// Create bot and add dialogs
var bot = new builder.BotConnectorBot({ appId: process.env.app_id, appSecret: process.env.app_secret });
bot.add('/', function (session) {
    session.send('hello!!!!');
});


var server = restify.createServer();

function respond(req, res, next) {
    res.send('Hello Restify!');
}
server.get('/', respond);

server.post('/api/messages', bot.verifyBotFramework(), bot.listen());

var port = process.env.PORT || 5000;
server.listen(port, function () {
    console.log('%s listening to %s', server.name, server.url);
});
