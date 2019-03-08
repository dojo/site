import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import Block from '@dojo/framework/widget-core/meta/Block';
import { tsx } from '@dojo/framework/widget-core/tsx';
import i18n from '@dojo/framework/i18n/i18n';

import compiler from '../../scripts/compile-remote.block';

import Page from './Page';

export interface RemotePageProperties {
	repo: string;
	branch?: string;
	path: string;
	relativeUrl?: string;
	hasLeftSideMenu?: boolean;
}

export default class RemotePage extends WidgetBase<RemotePageProperties> {
	protected render() {
		const { repo, branch, path, relativeUrl, hasLeftSideMenu = false } = this.properties;

		const content: any = this.meta(Block).run(compiler)({
			repo,
			branch,
			path,
			relativeUrl,
			locale: i18n.locale
		});

		return <Page hasLeftSideMenu={hasLeftSideMenu}>{content}</Page>;
	}
}
