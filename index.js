const fs = require('fs');
const path = require('path');

require('dotenv').config(); // read config from .env file
const Discord = require('discord.js');

global.client = new Discord.Client({ forceFetchUsers: true });
const client = global.client;

/* ------- Module loader ------- */
function loadModules(dirPath) {
	const dirents = fs.readdirSync(dirPath, {withFileTypes: true});
	const dirs = dirents.filter(de => de.isDirectory());
	for(const de of dirs) // recursively load directories
		loadModules(path.join(dirPath, de.name));
	for(const de of dirents.filter(de => de.isFile())) {
		const mod = require(path.resolve(dirPath, de.name));
		for(const eventName in mod.events)
			client.on(eventName, mod.events[eventName]);
	}
}

// Connect to Discord API
client.login(process.env.BOT_TOKEN);

client.on('ready', async () => {
	loadModules('./modules');
	console.log('Bot is online!');
});

client.on('message', async message => {
	if(message.content === 'ping')

		require('./commands/ping.js').exec(message);
});
