import { join } from 'canonical-path';
import { DNode } from '@dojo/framework/core/interfaces';

import { registerHandlers, handlers, fromMarkdown, getLocalFile, getMetaData, toDNodes } from './compile';
import { YamlData } from './util';

const CONTENT_PATH = join(__dirname, '../../content');

interface CompileBlogPost {
	excerpt?: boolean;
	path: string;
}

export interface BlogPost {
	content: DNode;
	rawContent: string;
	meta: {
		[key: string]: YamlData;
	};
	file: string;
	sortDate: Date;
}

export default async function(options: CompileBlogPost): Promise<any> {
	const { path } = options;

	const contentPath = join(CONTENT_PATH, path);

	let rawContent = await getLocalFile(contentPath);
	rawContent = options.excerpt ? rawContent.split('<!-- more -->')[0] : rawContent;

	const content = toDNodes(fromMarkdown(rawContent, registerHandlers(handlers)));
	const meta = await getMetaData(rawContent);

	const post: BlogPost = { content, meta, file: path, sortDate: new Date(`${meta.date}`), rawContent };

	return post;
}
