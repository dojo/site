import { join } from 'canonical-path';
import { readdir } from 'fs-extra';

import { getLocalFile, getMetaData } from './compile';

const CONTENT_PATH = join(__dirname, '../../content/blog');

interface CompileBlogIndex {
	locale?: string;
}

export default async function(options: CompileBlogIndex) {
	const { locale = 'en' } = options;
	const contentPath = join(CONTENT_PATH, locale);

	const files = await readdir(contentPath);
	const blogs: { sortDate: Date, file: string }[] = [];

	for (let file of files) {
		const content = await getLocalFile(join(contentPath, file));
		const blogMetaData = getMetaData(content);

		blogs.push({
			sortDate: new Date(`${blogMetaData.date}`),
			file: join('blog', locale, file)
		});
	}

	blogs.sort((a, b) => b.sortDate.getTime() - a.sortDate.getTime());

	return blogs.map((blog) => blog.file);
}
