import { join } from 'canonical-path';
import { readdir, readFile } from 'fs-extra';

import metadata from '../common/metadata';
import { createBlogFeed } from './rss';

const CONTENT_PATH = join(__dirname, '../../content/blog');

interface CompileBlogIndex {
	locale?: string;
}

export interface BlogFile {
	sortDate: Date;
	meta: {
		[key: string]: any;
	};
	file: string;
	content: string;
}

export default async function(options: CompileBlogIndex) {
	const { locale = 'en' } = options;
	const contentPath = join(CONTENT_PATH, locale);

	const files = await readdir(contentPath);
	const blogs: BlogFile[] = [];

	for (let file of files) {
		const content = await readFile(join(contentPath, file), 'utf-8');
		const blogMetaData = metadata(content);

		blogs.push({
			sortDate: new Date(`${blogMetaData.date}`),
			meta: blogMetaData,
			file: join('blog', locale, file),
			content
		});
	}

	blogs.sort((a, b) => b.sortDate.getTime() - a.sortDate.getTime());

	createBlogFeed(blogs);

	return blogs.map((blog) => blog.file);
}
