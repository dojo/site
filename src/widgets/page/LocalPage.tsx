import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import Block from '@dojo/framework/widget-core/meta/Block';
import { tsx } from '@dojo/framework/widget-core/tsx';

import compiler from '../../scripts/compile-local.block';

import Page from './Page';

export interface LocalPageProperties {
	path: string;
	warpInPage?: boolean;
}

export default class LocalPage extends WidgetBase<LocalPageProperties> {
	protected render() {
		const { path, warpInPage = true } = this.properties;

		const content: any = this.meta(Block).run(compiler)({
			path,
			locale: 'en'
		});

		if (!warpInPage) {
			return content;
		}

		return <Page>{content}</Page>;
	}
}
