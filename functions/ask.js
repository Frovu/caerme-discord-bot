
module.exports = function(msg, question) {
	return new Promise((resolve) => {
		msg.channel.send(question);
		const collector = msg.channel.createMessageCollector(m => m.author.id === msg.author.id, {time: 30000});
		collector.on('collect', msg => {
			if(['stop', 'q', 'abort'].includes(msg.content)) {
				collector.stop('abort');
			} else {
				resolve(msg.content);
				collector.stop('ok');
			}
		});
		collector.on('stop', reason => {
			if(reason !== 'ok') resolve(false);
		});
	});
};
