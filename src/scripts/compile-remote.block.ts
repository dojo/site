import fetch from 'node-fetch';

import { registerHandlers, handlers, fromMarkdown, setLocale, toDNodes } from './compile';

export interface CompileRemoteBlockOptions {
	repo: string;
	branch?: string;
	path: string;
	locale?: string;
}

export default async function(options: CompileRemoteBlockOptions) {
	const { repo, branch = 'master', path, locale = 'en' } = options;

	const pagePath = setLocale(path, locale);

	const response = await fetch(`https://raw.githubusercontent.com/${repo}/${branch}/${pagePath}`);
	const content = await response.text();

	return toDNodes(fromMarkdown(content, registerHandlers(handlers)));
}
