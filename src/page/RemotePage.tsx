import { tsx, create } from '@dojo/framework/core/vdom';
import block from '@dojo/framework/core/middleware/block';

import compileRemoteBlock from '../common/compile-remote.block';
import compileRemoteHeadersBlock, { SupplementalPageLookup } from '../common/compile-remote-headers.block';

import Page from './Page';
import { DNode } from '@dojo/framework/core/interfaces';

export interface RemotePageProperties {
	repo: string;
	branch?: string;
	path: string;
	header?: string;
	wrapInPage?: boolean;
}

const factory = create({ block }).properties<RemotePageProperties>();

export default factory(function RemotePage({ middleware: { block }, properties }) {
	const { repo, branch, path, header, wrapInPage = true } = properties();

	let content: DNode;
	const locale = 'en';

	// Render only the contents of a given header
	if (header) {
		const pages = block(compileRemoteHeadersBlock)({
			repo,
			branch,
			path,
			locale
		}) as SupplementalPageLookup | null;

		if (pages && pages[header]) {
			content = pages[header];
		}
	}
	// Render an entire markdown file
	else {
		content = block(compileRemoteBlock)({
			repo,
			branch,
			path,
			locale
		});
	}

	if (!wrapInPage) {
		return content;
	}

	return <Page>{content}</Page>;
});
