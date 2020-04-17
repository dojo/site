import { isVNode } from '@dojo/framework/core/vdom';
import { DNode } from '@dojo/framework/core/interfaces';
import select from '@dojo/framework/testing/harness/support/selector';

import { toString } from '../util/to-string';

import compileRemoteBlock, { CompileRemoteBlockOptions } from './content.block';

export type SupplementalPageLookup = { [header: string]: DNode };
export interface SupplementalHeaders {
	title: string;
	param: string;
}

export default async function(options: CompileRemoteBlockOptions) {
	const content = await compileRemoteBlock(options);
	const nodes = isVNode(content) && content.children ? content.children : [];
	return getHeaders(nodes);
}

function getHeaders(nodes: DNode[]) {
	const headers = select('h1', nodes);
	return headers.map((header) => {
		const title = toString(header).trim();
		const param = title
			.toLocaleLowerCase()
			.replace(/[^a-z0-9\u4E00-\u9FCC ]/g, '')
			.replace(/ /g, '-');

		return {
			title,
			param
		};
	});
}
