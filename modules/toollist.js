const fs = require('fs');
const path = require('path');

const jsonPath = './data/tools.json';
let tools;
try { tools = require(path.resolve(jsonPath)); } catch(e) { } // eslint-disable-line
const jsonDump = () => fs.writeFileSync(jsonPath, JSON.stringify(tools, null, 2), 'utf8');

module.exports.add = function(name, link, tags) {
	tools[name] = { link: link, tags: tags };
	jsonDump();
};

module.exports.remove = function(name) {
	delete tools[name];
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
