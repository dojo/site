import { resolve, parse } from 'canonical-path';
import { readJSONSync } from 'fs-extra';

interface ManifestConfigFile {
	name: string;
	path: string;
}

interface ManifestConfig {
	[section: string]: ManifestConfigFile[];
}

export default function(section: string) {
	console.log(section);
	const manifestPath = resolve('content', 'manifest.json');
	
	const manifest: ManifestConfig = readJSONSync(manifestPath);
	
	let paths: ManifestConfigFile[] = [];
	paths = manifest[section].map(({ name, path }: { name: string; path: string }) => ({
		name,
		path: parse(path).name
	}));
	
	return paths;
};
