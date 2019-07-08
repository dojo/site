import harness from '@dojo/framework/testing/harness';
import block from '@dojo/framework/core/middleware/block';
import { createMockBlockMiddleware } from '../../test/util/mockBlock';
import { tsx } from '@dojo/framework/core/vdom';

import compiler from '../../scripts/compile-local.block';

import Page from './Page';
import LocalPage from './LocalPage';

jest.mock('@dojo/framework/i18n/i18n', () => ({
	default: {
		locale: 'en-US'
	}
}));

describe('Page', () => {
	it('renders', () => {
		const mockCompiler = jest.fn().mockReturnValue('Some content');
		const mockBlock = createMockBlockMiddleware([[compiler, mockCompiler]]);
		const h = harness(() => <LocalPage path="path/to/file.md" />, { middleware: [[block, mockBlock]] });
		h.expect(() => <Page>Some content</Page>);
		expect(mockCompiler).toHaveBeenCalledWith({ path: 'path/to/file.md', locale: 'en' });
	});

	it('renders only content without Page widget', () => {
		const mockCompiler = jest.fn().mockReturnValue('Some content');
		const mockBlock = createMockBlockMiddleware([[compiler, mockCompiler]]);
		const h = harness(() => <LocalPage path="path/to/file.md" wrapInPage={false} />, {
			middleware: [[block, mockBlock]]
		});
		h.expect(() => 'Some content');
		expect(mockCompiler).toHaveBeenCalledWith({ path: 'path/to/file.md', locale: 'en' });
	});
});
