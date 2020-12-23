const tools = require('../../modules/toollist');

module.exports = {
	alias: [ 'tools', 'list', 'tool', 'show' ],
	help: {
		desc: 'List tools with specified tags',
		usage: '$ [<tags list ..>]'
	},
	exec: async function(message, args) {
		const filtered = tools.list(args);
		const embed = {
			title: `Tools query: \`${args.join(', ')||'all'}\``,
			description:  Object.keys(filtered).length === 0 ? '**Nothing found**' : '',
			fields: [],
			color: Object.keys(filtered).length && 0x00ffff
		};
		for(const t in filtered) {
			const tool = filtered[t];
			embed.fields.push({
				name: `${t}`,
				value: `${tool.tags.map(tg => `\`${tg}\``).join(' ')}\n[link](${tool.url})\n${tool.desc}`
			});
		}
		await message.channel.send({embed: embed});
	}
};
