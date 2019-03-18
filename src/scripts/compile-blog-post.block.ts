import { join } from 'canonical-path';

import { registerHandlers, handlers, fromMarkdown, setLocale, getLocalFile, getMetaData } from './compile';

const CONTENT_PATH = join(__dirname, '../../content');

interface CompileBlogPost {
	excerpt?: boolean;
	locale?: string;
	path: string;
}

export default async function(options: CompileBlogPost): Promise<any> {
	const { path, locale = 'en' } = options;

	let contentPath = join(CONTENT_PATH, path);
	contentPath = setLocale(contentPath, locale);

	let rawContent = await getLocalFile(contentPath);
	rawContent = options.excerpt ? rawContent.split('<!-- more -->')[0] : rawContent;
	const content = await fromMarkdown(rawContent, registerHandlers(handlers));
	const meta = await getMetaData(rawContent);
	return { content, meta };
}
