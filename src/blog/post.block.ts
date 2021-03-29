import { join } from 'canonical-path';
import { readFile } from 'fs-extra';
import { resolve } from 'path';

import markdown from '../common/markdown';
import metadata from '../common/metadata';

const CONTENT_PATH = join(__dirname, '../../content');

interface CompileBlogPost {
	excerpt?: boolean;
	path: string;
}

export default async function (options: CompileBlogPost) {
	const { path } = options;

	const contentPath = resolve(__dirname, join(CONTENT_PATH, path));

	let rawContent = await readFile(contentPath, 'utf-8');
	rawContent = options.excerpt ? rawContent.split('<!-- more -->')[0] : rawContent;

	const content = markdown(rawContent, false);
	const meta = metadata(rawContent);
	return { content, meta };
}
