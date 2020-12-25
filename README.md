
### Module structure:
```js
module.exports = {
	events: {
		"eventName": async ( ... ) => { ... }
	}
}
```

### Command structure:
```js
module.exports = {
	alias: [ .. ],
	help: {
		desc: "...",
		usage: "..."
	},
	exec: async function(message, args) {

	}
}
```

### .env example:

```
BOT_TOKEN=
PREFIX=.
AUTHOR=
```
