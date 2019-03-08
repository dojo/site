import fetch from 'node-fetch';

import { registerHandlers, handlers, fromMarkdown, setLocale } from './compile';

export interface CompileRemoteBlockOptions {
	repo: string;
	branch?: string;
	path: string;
	locale?: string;
	relativeUrl?: string;
}

export default async function(options: CompileRemoteBlockOptions) {
	const { repo, branch = 'master', path, locale = 'en', relativeUrl } = options;

	let pagePath = path;
	if (relativeUrl) {
		pagePath = pagePath.replace(/\/([^\/]+)$/g, `/${relativeUrl}.md`);
	}
	pagePath = setLocale(pagePath, locale);

	const response = await fetch(`https://raw.githubusercontent.com/${repo}/${branch}/${pagePath}`);
	const content = await response.text();

	return fromMarkdown(content, registerHandlers(handlers));
}
