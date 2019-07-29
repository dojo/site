import fetch from 'node-fetch';

import markdown from '../common/markdown';
import select from '@dojo/framework/testing/support/selector';

export interface CompileRemoteBlockOptions {
	repo: string;
	branch?: string;
	path: string;
	page: string;
	locale?: string;
	section?: string;
}

const staticPages = ['basic-usage', 'introduction', 'supplemental'];

export default async function(options: CompileRemoteBlockOptions) {
	const { repo, branch = 'master', path, locale = 'en', page } = options;
	const pagePath = path.replace(/:locale:/g, locale);
	const docPage = page !== 'introduction' && page !== 'basic-usage' ? 'supplemental.md' : `${page}.md`;
	const response = await fetch(`https://raw.githubusercontent.com/${repo}/${branch}/${pagePath}/${docPage}`);
	const content = await response.text();

	let nodes = markdown(content);
	if (staticPages.indexOf(page) === -1) {
		const headers = select('h1', nodes);
		const header: any = headers.find((node: any) => {
			if (node.children && node.children.length) {
				const title = node.children[0]
					.toLocaleLowerCase()
					.replace(/[^a-z0-9 ]/g, '')
					.replace(/ /g, '-');
				return title === page;
			}
			return false;
		});
		if (!header) {
			return null;
		}

		return JSON.parse(JSON.stringify(header.parent, (key, value) => {
			if (key === 'parent') {
				return undefined;
			}
			return value;
		}));
	}
	return markdown(content);
}
