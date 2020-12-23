require('dotenv').config(); // read config from .env file
const Discord = require('discord.js');

global.client = new Discord.Client({ forceFetchUsers: true });
const client = global.client;

// load modules

// Connect to Discord API
client.login(process.env.BOT_TOKEN);

client.on('ready', function () {
	console.log('Bot is online!');
});

client.on('message', async message => {
	if(message.content === 'ping')
		require('commands/ping.js').exec(message);
});
