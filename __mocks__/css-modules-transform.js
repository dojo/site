const fs = require('fs');

module.exports = {
	process(src, path) {
		const defFile = fs.readFileSync(path + '.d.ts', 'utf8');

		const keys = defFile
			.replace(/export const/g, '')
			.replace(/: string;/g, '')
			.trim()
			.split('\n');

		const returnModule = {};

		keys.forEach(key => {
			key = key.trim();
			returnModule[key] = `${key}`;
		});
		returnModule[' _key'] = 'key';

		return `module.exports = ${JSON.stringify(returnModule)};`;
	}
};
