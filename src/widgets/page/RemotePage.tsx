import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import Block from '@dojo/framework/widget-core/meta/Block';
import { tsx } from '@dojo/framework/widget-core/tsx';

import compileRemoteBlock from '../../scripts/compile-remote.block';
import compileRemoteHeadersBlock from '../../scripts/compile-remote-headers.block';

import Page from './Page';

export interface RemotePageProperties {
	repo: string;
	branch?: string;
	path: string;
	header?: string;
	warpInPage?: boolean;
}

export default class RemotePage extends WidgetBase<RemotePageProperties> {
	protected render() {
		const { repo, branch, path, header, warpInPage = true } = this.properties;

		let content: any;
		const locale = 'en';

		// Render only the contents of a given header
		if (header) {
			const pages: any = this.meta(Block).run(compileRemoteHeadersBlock)({
				repo,
				branch,
				path,
				locale
			});

			if (pages && pages[header]) {
				content = pages[header];
			}
		}
		// Render an entire markdown file
		else {
			content = this.meta(Block).run(compileRemoteBlock)({
				repo,
				branch,
				path,
				locale
			});
		}

		if (!warpInPage) {
			return content;
		}

		return <Page>{content}</Page>;
	}
}
