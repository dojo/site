import { join } from 'canonical-path';
import { readdir } from 'fs-extra';

import { getLocalFile, getMetaData, toDNodes, fromMarkdown, registerHandlers, handlers } from './compile';
import { createBlogFeed } from './blog-rss';
import { BlogPost } from './compile-blog-post.block';

const CONTENT_PATH = join(__dirname, '../../content/blog');

interface CompileBlogIndex {
	locale?: string;
}

export default async function(options: CompileBlogIndex) {
	const { locale = 'en' } = options;
	const contentPath = join(CONTENT_PATH, locale);

	const files = await readdir(contentPath);
	const blogs: BlogPost[] = [];

	for (let file of files) {
		let rawContent = await getLocalFile(join(contentPath, file));
		rawContent = rawContent.split('<!-- more -->')[0];

		const content = toDNodes(fromMarkdown(rawContent, registerHandlers(handlers)));
		const blogMetaData = getMetaData(rawContent);

		blogs.push({
			sortDate: blogMetaData.date ? new Date(`${blogMetaData.date}`) : new Date(),
			meta: blogMetaData,
			file: join('blog', locale, file),
			content,
			rawContent
		});
	}

	blogs.sort((a, b) => b.sortDate.getTime() - a.sortDate.getTime());

	createBlogFeed(blogs);

	return blogs;
}
