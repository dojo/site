import { join } from 'canonical-path';

import { registerHandlers, handlers, fromMarkdown, setLocale, getLocalFile, toDNodes } from './compile';

const CONTENT_PATH = join(__dirname, '../../content');

interface CompileLocalBlockOptions {
	path: string;
	locale?: string;
}

export default async function(options: CompileLocalBlockOptions) {
	const { path, locale = 'en' } = options;

	let contentPath = join(CONTENT_PATH, path);
	contentPath = setLocale(contentPath, locale);

	const content = await getLocalFile(contentPath);
	return toDNodes(fromMarkdown(content, registerHandlers(handlers)));
}
