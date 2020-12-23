module.exports = {
	alias: [ 'ping' ],
	help: {
		desc: 'Test connectivity',
		usage: '$'
	},
	exec: async function(message) {
		const m = await message.channel.send('Ping ?');
		m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. WebSocket ping is ${Math.round(global.client.ws.ping)}ms`);
	}
};
