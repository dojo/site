import { resolve, parse } from 'canonical-path';
import { readJSONSync } from 'fs-extra';

export interface PageDefinition {
	name: string;
	path: string;
}

interface ManifestConfig {
	[section: string]: PageDefinition[];
}

export default function(section: string) {
	const manifestPath = resolve('content', 'manifest.json');

	const manifest: ManifestConfig = readJSONSync(manifestPath);

	let paths: PageDefinition[] = [];
	paths = manifest[section].map(({ name, path }: { name: string; path: string }) => ({
		name,
		path: path.replace(parse(path).ext, '')
	}));

	return paths;
}
