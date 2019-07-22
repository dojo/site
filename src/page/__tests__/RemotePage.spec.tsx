import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';
import block from '@dojo/framework/core/middleware/block';

import compileRemoteBlock from '../../common/compile-remote.block';
import compileRemoteHeadersBlock from '../../common/compile-remote-headers.block';

import createBlockMock from '../../test/mockBlock';

import Page from '../Page';
import RemotePage from '../RemotePage';

jest.mock('@dojo/framework/i18n/i18n', () => ({
	default: {
		locale: 'en-US'
	}
}));
jest.mock('../../common/compile-remote.block');

describe('Page', () => {
	const blockMock = createBlockMock([
		[compileRemoteBlock, 'Some content'],
		[
			compileRemoteHeadersBlock,
			{
				'some-page': [<h1>A page</h1>, <p>Some content</p>]
			}
		]
	]);

	it('renders without left menu', () => {
		const h = harness(() => <RemotePage repo="dojo/framework" path="path/to/file.md" />, {
			middleware: [[block, blockMock]]
		});

		h.expect(() => <Page>Some content</Page>);
	});

	it('renders with left menu', () => {
		const h = harness(() => <RemotePage repo="dojo/framework" path="path/to/file.md" />, {
			middleware: [[block, blockMock]]
		});

		h.expect(() => <Page>Some content</Page>);
	});

	it('renders with branch', () => {
		const h = harness(() => <RemotePage repo="dojo/framework" branch="branch" path="path/to/file.md" />, {
			middleware: [[block, blockMock]]
		});

		h.expect(() => <Page>Some content</Page>);
	});

	it('renders from header', () => {
		const h = harness(() => <RemotePage repo="dojo/framework" path="path/to/file.md" header="some-page" />, {
			middleware: [[block, blockMock]]
		});

		h.expect(() => (
			<Page>
				<h1>A page</h1>
				<p>Some content</p>
			</Page>
		));
	});

	it('renders blank with bad header', () => {
		const h = harness(() => <RemotePage repo="dojo/framework" path="path/to/file.md" header="bad-header" />, {
			middleware: [[block, blockMock]]
		});

		h.expect(() => <Page />);
	});

	it('renders from header with branch', () => {
		const h = harness(
			() => <RemotePage repo="dojo/framework" branch="branch" path="path/to/file.md" header="some-page" />,
			{ middleware: [[block, blockMock]] }
		);

		h.expect(() => (
			<Page>
				<h1>A page</h1>
				<p>Some content</p>
			</Page>
		));
	});

	it('renders only content without Page widget', () => {
		const h = harness(() => <RemotePage repo="dojo/framework" path="path/to/file.md" wrapInPage={false} />, {
			middleware: [[block, blockMock]]
		});

		h.expect(() => 'Some content');
	});
});
