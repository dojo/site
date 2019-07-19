import fetch from 'node-fetch';

import markdown from './markdown';

export interface CompileRemoteBlockOptions {
	repo: string;
	branch?: string;
	path: string;
	locale?: string;
}

export default async function(options: CompileRemoteBlockOptions) {
	const { repo, branch = 'master', path, locale = 'en' } = options;

	const pagePath = path.replace(/:locale:/g, locale);

	const response = await fetch(`https://raw.githubusercontent.com/${repo}/${branch}/${pagePath}`);
	const content = await response.text();

	return markdown(content);
}
