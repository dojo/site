import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';
import block from '@dojo/framework/core/middleware/block';

import localBlock from '../../page/local.block';

import createBlockMock from '../../test/mockBlock';

import Page from '../Page';
import LocalPage from '../LocalPage';

jest.mock('@dojo/framework/i18n/i18n', () => ({
	default: {
		locale: 'en-US'
	}
}));
jest.mock('../../page/local.block');

describe('Page', () => {
	const mockLocalBlock = jest.fn();
	mockLocalBlock.mockReturnValue('Some content');
	const mockBlock = createBlockMock([[localBlock, mockLocalBlock]]);

	it('renders', () => {
		const h = harness(() => <LocalPage path="path/to/file.md" />, { middleware: [[block, mockBlock]] });

		h.expect(() => <Page>Some content</Page>);
	});

	it('renders only content without Page widget', () => {
		const h = harness(() => <LocalPage path="path/to/file.md" wrapInPage={false} />, {
			middleware: [[block, mockBlock]]
		});

		h.expect(() => 'Some content');
	});
});
