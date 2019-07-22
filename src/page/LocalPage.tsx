import { tsx, create } from '@dojo/framework/core/vdom';
import block from '@dojo/framework/core/middleware/block';

import localBlock from './local.block';

import Page from './Page';

export interface LocalPageProperties {
	path: string;
	wrapInPage?: boolean;
}

const factory = create({ block }).properties<LocalPageProperties>();

export default factory(function LocalPage({ middleware: { block }, properties }) {
	const { path, wrapInPage = true } = properties();

	const content = block(localBlock)({
		path,
		locale: 'en'
	});

	if (!wrapInPage) {
		return content;
	}

	return <Page>{content}</Page>;
});
