const fs = require('fs');
const path = require('path');

const commands = {};
const resolveCommand = {};

function loadCommands(dirPath) {
	const dirents = fs.readDirSync(dirPath);
	for(const de of dirents.filter(de => de.isDirectory())) // recursively load directories
		loadCommands(path.join(dirPath, de.name));
	for(const de of dirents.filter(de => de.isFile())) {
		const cmd = require(path.resolve(dirPath, de.name));
		commands[cmd.alias[0]] = cmd;
		for(const alias in cmd.alias)
			resolveCommand[alias] = cmd;
	}
}
loadCommands('./commands');

async function handleMessage(message) {
	if(message.content.startsWith(process.env.PREFIX)) return;
	// if(message.author.bot) return;
	const argv = message.split(/\n|\r| +/g);
	const command = resolveCommand[argv[0]];
	if(command)
		command.exec(message, argv.slice(1));
}

module.exports.events = {
	'message': handleMessage
};
