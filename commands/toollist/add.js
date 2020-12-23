const ask = require('../../functions/ask');
const confirm = require('../../functions/confirm');
const tools = require('../../modules/toollist');

module.exports = {
	alias: [ 'add', 'newtool', 'addtool' ],
	help: {
		desc: 'Add new tool to registry',
		usage: '$ <tool name>'
	},
	exec: async function(message, args) {
		const tool = args.join(' ');
		if(!tool)
			return await message.channel.send({embed: global.errorEmbed('Enter name for the tool')});
		const desc = await ask(message, 'Please enter brief tool description:');
		if(!desc) return;
		const link = await ask(message, 'Please enter tool url:');
		if(!link) return;
		const rawtags = await ask(message, 'Please enter tool search tags:');
		if(!rawtags) return;
		const tags = rawtags.split(/,|\s+/g).filter(t => t);
		const confEmbed = {embed: {
			title: 'You want to add a tool:',
			fields: [
				{name: 'name', value: `**${tool}**`},
				{name: 'description', value: desc},
				{name: 'link', value: link},
				{name: 'tags', value: tags.map(t=>`\`${t}\``).join(' ')}
			],
			color: 0xff7700
		}};
		if(!(await confirm(message.channel, message.author.id, confEmbed)))
			return;
		tools.add(tool, link, desc, tags);
		message.channel.send({embed: global.successEmbed(`Tool added: **${tool}**`)});
	}
};
