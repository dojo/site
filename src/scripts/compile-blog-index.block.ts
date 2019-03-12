import { basename } from 'path';
import { join } from 'canonical-path';
import { readdir } from 'fs';

import { setLocale } from './compile';

const CONTENT_PATH = join(__dirname, '../../content/blog');

interface CompileBlogIndex {
	locale?: string;
}

export default async function(options: CompileBlogIndex): Promise<any> {
	const { locale = 'en' } = options;
	const contentPath = setLocale(CONTENT_PATH, locale);

	return new Promise((resolve) => {
		readdir(contentPath, (err, files) => {
			resolve(files.map((file) => `blog/${basename(file)}`));
		});
	});
}
