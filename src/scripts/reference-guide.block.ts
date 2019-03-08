import { isVNode, v } from '@dojo/framework/widget-core/d';
import { DNode } from '@dojo/framework/widget-core/interfaces';

import compileRemote, { CompileRemoteBlockOptions } from './compile-remote.block';

export interface ReferenceGuideBlockOptions extends CompileRemoteBlockOptions {
	headersOnly?: boolean;
}

export type SupplementalPageLookup = { [header: string]: DNode };

export default async function(options: ReferenceGuideBlockOptions): Promise<SupplementalPageLookup | string[]> {
	const { headersOnly = false } = options;

	let content = await compileRemote(options);
	content = Array.isArray(content) ? content : [content];

	// Unwrap content's outer div
	const nodes = content.reduce<DNode[]>((array, node) => {
		if (isVNode(node) && node.tag === 'div' && node.children) {
			array.push(...node.children);
		}
		else {
			array.push(node);
		}
		return array;
	}, []);

	return headersOnly ? getHeaders(nodes) : getPages(nodes);
}

function getHeaders(nodes: DNode[]) {
	const headers: string[] = [];

	nodes.map((node) => {
		if (isVNode(node) && node.tag === 'h1' && node.children && node.children.length === 1) {
			const child = node.children[0];
			if (typeof child === 'string') {
				headers.push(child.trim());
			}
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
				console.log('Page: ', page);
				pages[pageName] = v('div', {}, page);
			}

			if (node.children && node.children.length === 1) {
				const child = node.children[0];
				if (typeof child === 'string') {
					pageName = child.trim().toLocaleLowerCase().replace(/[^a-z]/g, '-');
				}
			}
			
			page = undefined;
			page = [node];
		}
		else if (page) {
			page.push(node);
		}
	});

	if (page && pageName) {
		console.log('Page: ', page);
		pages[pageName] = v('div', {}, page);
	}

	return pages;
}
