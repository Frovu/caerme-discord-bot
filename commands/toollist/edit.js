const tools = require('../../modules/toollist');
const confirm = require('../../functions/confirm');
const ask = require('../../functions/ask');

const numEmoji = ['0️⃣', '1️⃣',  '2️⃣', '3️⃣',  '4️⃣', '5️⃣',  '6️⃣', '7️⃣',  '8️⃣', '9️⃣', '🔟'];

module.exports = {
	alias: [ 'edit', 'edittool', 'change' ],
	help: {
		desc: 'Edit tool entry',
		usage: '$ tool name'
	},
	exec: async function(message, args) {
		const name = tools.exists(args.join(' '));
		if(!name)
			return await message.channel.send({embed: global.errorEmbed('Tool not found')});
		const options = ['delete', 'edit desc', 'edit url', 'edit tags'];
		let i=0;
		const msg = await message.channel.send({embed: {
			title: 'Choose option',
			description:  options.map(o => `${numEmoji[i++]}** - ${o}**`).join('\n'),
			color: 0xffff00
		}});
		const opt = await new Promise((resolve) => {
			const collector = msg.createReactionCollector((r,u) => u.id === message.author.id, {time: 60000});
			collector.on('collect', (r) => {
				const n = numEmoji.indexOf(r.emoji.name);
				if(n >= 0 && n < options.length) {
					collector.stop('ok');
					resolve(n);
				}
			});
			collector.on('stop', (reason) => {
				if(reason !== 'ok') resolve(-1);
			});
			for(i in options)
				msg.react(numEmoji[i]);
		});
		if(opt < 0) return;
		const tool = tools.get(name);
		if(options[opt] === 'delete') {
			if(!(await confirm(message.channel, message.author.id, {embed: {
				color: 0xff0000,
				title: 'Are you sure to delete tool?',
				fields:[{name: 'name', value: `**${name}**`},
					{name: 'description', value: tool.desc},
					{name: 'link', value: tool.link},
					{name: 'tags', value: tool.tags.map(t=>`\`${t}\``).join(' ')}]
			}})))
				return;
			tools.remove(name);
		} else {
			const field = options[opt].split(' ')[1];
			const input = await ask(message, `Please enter new \`${field}\` for tool **${name}**:`);
			if(!input || !(await confirm(message.channel, message.author.id, {embed: {
				color: 0xffbb00,
				title: `About to change tool's \`${field}\`:`,
				fields:[{name: 'tool', value: `**${name}**`},
					{name: 'before', value: tool[field]},
					{name: 'after', value: input}]
			}})))
				return;
			tool[field] = input;
			tools.change(name, tool);
		}
		await message.channel.send({embed: global.successEmbed('Done.')});
	}
};
