import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';

import * as compiler from '../../scripts/compile-local.block';

import Page from '../Page';
import LocalPage from '../LocalPage';

jest.mock('@dojo/framework/i18n/i18n', () => ({
	default: {
		locale: 'en-US'
	}
}));
jest.mock('../../scripts/compile-local.block');

describe('Page', () => {
	const mockCompiler = jest.spyOn(compiler, 'default').mockReturnValue('Some content' as any);

	it('renders', () => {
		const h = harness(() => <LocalPage path="path/to/file.md" />);

		expect(mockCompiler).toHaveBeenCalledWith({ path: 'path/to/file.md', locale: 'en' });

		h.expect(() => <Page>Some content</Page>);
	});

	it('renders only content without Page widget', () => {
		const h = harness(() => <LocalPage path="path/to/file.md" wrapInPage={false} />);

		expect(mockCompiler).toHaveBeenCalledWith({ path: 'path/to/file.md', locale: 'en' });

		h.expect(() => 'Some content');
	});
});
