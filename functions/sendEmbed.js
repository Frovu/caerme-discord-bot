module.exports = async function(channel, embed, text) {
	const old_fields = embed.fields || [];
	const desc = embed.description || '';
	embed.description = desc.slice(0, 2048);
	embed.fields = [];
	if(desc.length > 2048) {
		for(let i=1; i<desc.length/2048; ++i) {
			await channel.send({embed: embed});
			embed.description = desc.slice(i*2048, (i+1)*2048);
		}
	}
	// split fields
	let fields = [];
	let len = desc.length % 2048;
	const sendPart = async() => {
		embed.fields = fields;
		await channel.send({embed: embed});
		len = 0;
		fields = [];
		embed.description = undefined;
	};
	for(let f of old_fields) {
		if(!f.value) continue;
		if(len + (f.value.length>1024?1024:f.value.length) > 5700) // -300 here just because I can
			await sendPart();
		fields.push({name: f.name, value: f.value.slice(0, 1024), inline:f.inline});
		len += f.value.length > 1024 ? 1024 : f.value.length;
		len += f.name.length;
		for(let i=1; i<f.value.length/1024; ++i) {
			if(len + f.value.length - 1024*i > 5700) // -300 here just because I can
				await sendPart();
			len += f.value.length - 1024*i > 1024 ? 1024 : f.value.length - 1024*i;
			len += f.name.length;
			fields.push({name: '->', value: f.value.slice(1024*i, 1024*(i+1)), inline:f.inline});
		}
	}
	embed.fields = fields;
	return await channel.send(text, {embed: embed});
};
