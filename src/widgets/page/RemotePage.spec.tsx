import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';

import * as compileRemoteBlock from '../../scripts/compile-remote.block';
import * as compileRemoteHeadersBlock from '../../scripts/compile-remote-headers.block';

import Page from './Page';
import RemotePage from './RemotePage';

jest.mock('@dojo/framework/i18n/i18n', () => ({
	default: {
		locale: 'en-US'
	}
}));
jest.mock('../../scripts/compile-remote.block');

describe('Page', () => {
	const mockCompileRemoteBlock = jest.spyOn(compileRemoteBlock, 'default').mockReturnValue('Some content' as any);
	const mockCompileRemoteHeadersBlock = jest.spyOn(compileRemoteHeadersBlock, 'default').mockReturnValue({
		'some-page': [<h1>A page</h1>, <p>Some content</p>]
	} as any);

	it('renders without left menu', () => {
		const h = harness(() => <RemotePage repo="dojo/framework" path="path/to/file.md" />);

		expect(mockCompileRemoteBlock).toHaveBeenCalledWith({
			repo: 'dojo/framework',
			path: 'path/to/file.md',
			locale: 'en'
		});

		h.expect(() => <Page hasLeftSideMenu={false}>Some content</Page>);
	});

	it('renders with left menu', () => {
		const h = harness(() => <RemotePage repo="dojo/framework" path="path/to/file.md" hasLeftSideMenu />);

		expect(mockCompileRemoteBlock).toHaveBeenCalledWith({
			repo: 'dojo/framework',
			path: 'path/to/file.md',
			locale: 'en'
		});

		h.expect(() => <Page hasLeftSideMenu>Some content</Page>);
	});

	it('renders with branch', () => {
		const h = harness(() => <RemotePage repo="dojo/framework" branch="branch" path="path/to/file.md" />);

		expect(mockCompileRemoteBlock).toHaveBeenCalledWith({
			repo: 'dojo/framework',
			branch: 'branch',
			path: 'path/to/file.md',
			locale: 'en'
		});

		h.expect(() => <Page hasLeftSideMenu={false}>Some content</Page>);
	});

	it('renders from header', () => {
		const h = harness(() => <RemotePage repo="dojo/framework" path="path/to/file.md" header="some-page" />);

		expect(mockCompileRemoteHeadersBlock).toHaveBeenCalledWith({
			repo: 'dojo/framework',
			branch: undefined,
			path: 'path/to/file.md',
			locale: 'en'
		});

		h.expect(() => (
			<Page hasLeftSideMenu={false}>
				<h1>A page</h1>
				<p>Some content</p>
			</Page>
		));
	});

	it('renders blank with bad header', () => {
		const h = harness(() => <RemotePage repo="dojo/framework" path="path/to/file.md" header="bad-header" />);

		expect(mockCompileRemoteHeadersBlock).toHaveBeenCalledWith({
			repo: 'dojo/framework',
			branch: undefined,
			path: 'path/to/file.md',
			locale: 'en'
		});

		h.expect(() => <Page hasLeftSideMenu={false} />);
	});

	it('renders from header with branch', () => {
		const h = harness(() => (
			<RemotePage repo="dojo/framework" branch="branch" path="path/to/file.md" header="some-page" />
		));

		expect(mockCompileRemoteHeadersBlock).toHaveBeenCalledWith({
			repo: 'dojo/framework',
			branch: 'branch',
			path: 'path/to/file.md',
			locale: 'en'
		});

		h.expect(() => (
			<Page hasLeftSideMenu={false}>
				<h1>A page</h1>
				<p>Some content</p>
			</Page>
		));
	});

	it('renders only content without Page widget', () => {
		const h = harness(() => <RemotePage repo="dojo/framework" path="path/to/file.md" warpInPage={false} />);

		expect(mockCompileRemoteBlock).toHaveBeenCalledWith({
			repo: 'dojo/framework',
			path: 'path/to/file.md',
			locale: 'en'
		});

		h.expect(() => 'Some content');
	});
});
