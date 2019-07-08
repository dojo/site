import block from '@dojo/framework/core/middleware/block';
import { create, tsx } from '@dojo/framework/core/vdom';

import compiler from '../../scripts/compile-local.block';

import Page from './Page';

export interface LocalPageProperties {
	path: string;
	wrapInPage?: boolean;
}

const factory = create({ block }).properties<LocalPageProperties>();

export default factory(function LocalPage({ properties, middleware: { block } }) {
	const { path, wrapInPage = true } = properties;

	const content = block.run(compiler)({
		path,
		locale: 'en'
	});
	if (!wrapInPage) {
		return content;
	}

	return <Page>{content}</Page>;
});
