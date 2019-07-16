import { join } from 'canonical-path';

import { readFile } from 'fs-extra';
import markdown from '../common/markdown';

const CONTENT_PATH = join(__dirname, '../../content');

interface CompileLocalBlockOptions {
	path: string;
	locale?: string;
}

export default async function(options: CompileLocalBlockOptions) {
	const { path, locale = 'en' } = options;

	const contentPath = join(CONTENT_PATH, path).replace(/:locale:/g, locale);

	let content = await readFile(contentPath, 'utf-8');
	return markdown(content);
}
