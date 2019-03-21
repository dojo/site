import { join } from 'canonical-path';

import { registerHandlers, handlers, fromMarkdown, getLocalFile, getMetaData, toDNodes } from './compile';

const CONTENT_PATH = join(__dirname, '../../content');

interface CompileBlogPost {
	excerpt?: boolean;
	path: string;
}

export default async function(options: CompileBlogPost): Promise<any> {
	const { path } = options;

	const contentPath = join(CONTENT_PATH, path);

	let rawContent = await getLocalFile(contentPath);
	rawContent = options.excerpt ? rawContent.split('<!-- more -->')[0] : rawContent;

	const content = toDNodes(fromMarkdown(rawContent, registerHandlers(handlers)));
	const meta = await getMetaData(rawContent);
	return { content, meta };
}
