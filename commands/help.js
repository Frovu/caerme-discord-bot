const cmds = require('../modules/commands');

module.exports = {
	alias: [ 'help' ],
	help: {
		desc: 'Show this message',
		usage: '$'
	},
	exec: async function(message) {
		const commands = cmds.getCommands();
		const prefix = process.env.PREFIX;
		const embed = {
			title: 'Cáerme Bot Help',
			color: '#00dfdf',
			footer: {text: 'syava gay'},
			fields: []
		};
		for(const cmd in commands) {
			const command = commands[cmd];
			embed.fields.push({
				name: `${cmd}`,
				value: `${command.help.desc}\nUsage: \`${prefix}${command.help.usage.replace('$', cmd)}\``
			});
		}
		await message.channel.send({embed: embed});
	}
};
