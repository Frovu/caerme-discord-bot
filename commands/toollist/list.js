const tools = require('../../modules/toollist');

module.exports = {
	alias: [ 'tools', 'list', 'tool', 'show' ],
	help: {
		desc: 'List tools with specified tags',
		usage: '$ [<tags list ..>]'
	},
	exec: async function(message, args) {
		const filtered = tools.list(args);
		let i = 0; let desc = '';
		for(const t in filtered) {
			const tool = filtered[t];
			desc += `**${++i}. [${t}](${tool.url})**\n${tool.tags.map(tg => `\`${tg}\``).join(' ')}\n${tool.desc}\n`;
		}
		await message.channel.send({embed: {
			title: `Tools query: \`${args.join(', ')||'all'}\``,
			description:  desc || '**Nothing found**',
			color: desc && 0x00ffff
		}});
	}
};
