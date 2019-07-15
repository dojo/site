import WidgetBase from '@dojo/framework/core/WidgetBase';
import Block from '@dojo/framework/core/meta/Block';
import { tsx } from '@dojo/framework/core/vdom';

import compiler from '../scripts/compile-local.block';

import Page from './Page';

export interface LocalPageProperties {
	path: string;
	wrapInPage?: boolean;
}

export default class LocalPage extends WidgetBase<LocalPageProperties> {
	protected render() {
		const { path, wrapInPage = true } = this.properties;

		const content: any = this.meta(Block).run(compiler)({
			path,
			locale: 'en'
		});

		if (!wrapInPage) {
			return content;
		}

		return <Page>{content}</Page>;
	}
}
