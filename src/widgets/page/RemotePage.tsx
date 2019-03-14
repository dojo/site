import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import Block from '@dojo/framework/widget-core/meta/Block';
import { tsx } from '@dojo/framework/widget-core/tsx';
import i18n from '@dojo/framework/i18n/i18n';

import compileRemoteBlock from '../../scripts/compile-remote.block';
import compileRemoteHeadersBlock from '../../scripts/compile-remote-headers.block';
import { getLanguageFromLocale } from '../../util/language';

import Page from './Page';

export interface RemotePageProperties {
	repo: string;
	branch?: string;
	path: string;
	header?: string;
	hasLeftSideMenu?: boolean;
	warpInPage?: boolean;
}

export default class RemotePage extends WidgetBase<RemotePageProperties> {
	protected render() {
		const { repo, branch, path, header, hasLeftSideMenu = false, warpInPage = true } = this.properties;

		let content: any;
		const locale = getLanguageFromLocale(i18n.locale);

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

		return <Page hasLeftSideMenu={hasLeftSideMenu}>{content}</Page>;
	}
}
