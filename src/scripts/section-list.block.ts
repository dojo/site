import { resolve, parse } from 'canonical-path';
import { readJSONSync } from 'fs-extra';
import { IconLookup, IconName } from '@fortawesome/fontawesome-svg-core';

export interface Subsection {
	name: string;
	pages: PageDefinition[];
}

export interface PageDefinition {
	name: string;
	url: string;
	path: string;
	icon: IconName | IconLookup;
	topic: string;
	description: string;
}

interface ManifestConfig {
	[section: string]: Subsection[];
}

export default function(section: string) {
	const manifestPath = resolve('content', 'manifest.json');

	const manifest: ManifestConfig = readJSONSync(manifestPath);

	let subsections: Subsection[] = [];
	if (!manifest[section]) {
		return [];
	}

	subsections = manifest[section].map(({ name, pages }) => ({
		name,
		pages: pages.map(({ name, path: filePath, icon, topic, description }: PageDefinition) => {
			const path = filePath.replace(parse(filePath).ext, '');
			return {
				name,
				url: path.replace(new RegExp(`^(.\/|..\/)*${section}\/`), ''),
				path,
				icon,
				topic,
				description
			};
		})
	}));

	return subsections;
}
