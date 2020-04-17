import fetch from 'node-fetch';

import markdown from '../common/markdown';
import select from '@dojo/framework/testing/harness/support/selector';

export interface CompileRemoteBlockOptions {
	repo: string;
	branch: string;
	path: string;
	page: string;
	language: string;
	locale: string;
}

const staticPages = ['introduction', 'supplemental'];

const url = (repo: string, branch: string, pagePath: string, docPage: string) => {
	return `https://raw.githubusercontent.com/${repo}/${branch}/${pagePath}/${docPage}`;
};

export default async function(options: CompileRemoteBlockOptions) {
	const { repo, branch, path, language, locale, page } = options;
	const docPage = page !== 'introduction' ? 'supplemental.md' : `${page}.md`;

	let pagePath = path.replace(/:locale:/g, language);
	let response = await fetch(url(repo, branch, pagePath, docPage));
	if (!response.ok) {
		pagePath = path.replace(/:locale:/g, locale);
		response = await fetch(url(repo, branch, pagePath, docPage));
		if (!response.ok) {
			pagePath = path.replace(/:locale:/g, 'en');
			response = await fetch(url(repo, branch, pagePath, docPage));
		}
	}

	if (!response.ok) {
		return null;
	}

	const content = await response.text();
	const nodes = markdown(content);
	if (staticPages.indexOf(page) > -1) {
		return nodes;
	}

	const headers = select('h1', nodes);
	const header: any = headers.find((node: any) => {
		if (node.children && node.children.length) {
			const title = node.children[1]
				.toLocaleLowerCase()
				.replace(/[^a-z0-9\u4E00-\u9FCC ]/g, '')
				.replace(/ /g, '-');
			return title === decodeURI(page);
		}
		return false;
	});

	if (!header) {
		return null;
	}

	return JSON.parse(
		JSON.stringify(header.parent, (key, value) => {
			if (key === 'parent') {
				return undefined;
			}
			return value;
		})
	);
}
