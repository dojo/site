import { join } from 'canonical-path';

import { registerHandlers, handlers, fromMarkdown, getLocalFile, getFrontmatter } from './compile';

const CONTENT_PATH = join(__dirname, '../../content');

interface CompileBlogPost {
	excerpt?: boolean;
	path: string;
}

export default async function(options: CompileBlogPost): Promise<any> {
	const { path } = options;

	let contentPath = join(CONTENT_PATH, path);

	let rawContent = await getLocalFile(contentPath);
	rawContent = options.excerpt ? rawContent.split('<!-- more -->')[0] : rawContent;

	const content = await fromMarkdown(rawContent, registerHandlers(handlers));
	const meta = await getFrontmatter(rawContent);

	return { content, meta };
}
