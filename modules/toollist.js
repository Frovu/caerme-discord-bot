const fs = require('fs');
const path = require('path');

const jsonPath = './data/tools.json';
let tools;
try { tools = require(path.resolve(jsonPath)); } catch(e) { tools = {}; }
const jsonDump = () => fs.writeFileSync(jsonPath, JSON.stringify(tools, null, 2), 'utf8');

module.exports.add = function(name, url, desc, tags) {
	tools[name] = { url: url, desc: desc, tags: tags };
	jsonDump();
};

module.exports.remove = function(name) {
	delete tools[name];
	jsonDump();
};

module.exports.exists = function(name) {
	return Object.keys(tools).find(k => k.toLowerCase() === name.toLowerCase());
};

module.exports.get = function(name) {
	return tools[name];
};

module.exports.change = function(name, new_entry) {
	tools[name] = new_entry;
	jsonDump();
};

module.exports.list = function(tags) {
	if(tags.length <= 0) return tools;
	const filtered = {};
	for(const t in tools)
		if(tags.every(tag => tools[t].tags.includes(tag)))
			filtered[t] = tools[t];
	return filtered;
};
