import { join, basename } from 'canonical-path';
import { readdir } from 'fs-extra';

const CONTENT_PATH = join(__dirname, '../../content/blog');

interface CompileBlogIndex {
	locale?: string;
}

export default async function(options: CompileBlogIndex) {
	const { locale = 'en' } = options;
	const contentPath = join(CONTENT_PATH, locale);

	const files = await readdir(contentPath);

	return files.map((file) => join('blog', locale, basename(file)));
}
