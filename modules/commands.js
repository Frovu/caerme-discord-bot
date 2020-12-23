const fs = require('fs');
const path = require('path');

const commands = {};
const resolveCommand = {};
const prefix = process.env.PREFIX;

function loadCommands(dirPath) {
	const dirents = fs.readdirSync(dirPath, {withFileTypes: true});
	for(const de of dirents.filter(de => de.isDirectory())) // recursively load directories
		loadCommands(path.join(dirPath, de.name));
	for(const de of dirents.filter(de => de.isFile())) {
		try {
			const cmd = require(path.resolve(dirPath, de.name));
			commands[cmd.alias[0]] = cmd;
			for(const alias of cmd.alias)
				resolveCommand[alias] = cmd;
		} catch(e) {
			console.log(`Failed importing command: ${de.name}`);
		}
	}
}
loadCommands('./commands');

async function handleMessage(message) {
	if(!message.content.startsWith(prefix)) return;
	// if(message.author.bot) return;
	const argv = message.content.slice(prefix.length).split(/\n|\r| +/g);
	const command = resolveCommand[argv[0]];
	if(command)
		command.exec(message, argv.slice(1));
}

module.exports.getCommands = () => commands;
module.exports.events = {
	'message': handleMessage
};
