import { isVNode, v } from '@dojo/framework/widget-core/d';
import { DNode } from '@dojo/framework/widget-core/interfaces';

import { toString } from '../util/to-string';

import compileRemote, { CompileRemoteBlockOptions } from './compile-remote.block';

export interface ReferenceGuideBlockOptions extends CompileRemoteBlockOptions {
	headersOnly?: boolean;
}

export type SupplementalPageLookup = { [header: string]: DNode };
export interface SupplementalHeaders {
	title: string;
	param: string;
};

export default async function(options: ReferenceGuideBlockOptions) {
	const { headersOnly = false } = options;

	const content = await compileRemote(options);

	// Unwrap content's outer div
	const nodes = isVNode(content) && content.children ? content.children : [];

	return headersOnly ? getHeaders(nodes) : getPages(nodes);
}

function getHeaders(nodes: DNode[]) {
	const headers: SupplementalHeaders[] = [];

	nodes.map((node) => {
		if (isVNode(node) && node.tag === 'h1') {
			const title = toString(node).trim();
			const param = title.toLocaleLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/ /g, '-');

			headers.push({
				title,
				param
			});
		}
	});

	return headers;
}

function getPages(nodes: DNode[]) {
	const pages: SupplementalPageLookup = {};
	let pageName: string | undefined = undefined;
	let page: DNode[] | undefined = undefined;

	nodes.map((node) => {
		// Start new page
		if (isVNode(node) && node.tag === 'h1') {
			if (page && pageName) {
				pages[pageName] = v('div', {}, page);
			}

			pageName = toString(node).trim().toLocaleLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/ /g, '-');
			page = undefined;
			page = [node];
		}
		else if (page) {
			page.push(node);
		}
	});

	if (page && pageName) {
		pages[pageName] = v('div', {}, page);
	}

	return pages;
}
