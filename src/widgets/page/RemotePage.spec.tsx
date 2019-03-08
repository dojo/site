import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';

import * as compiler from '../../scripts/compile-remote.block';

import Page from './Page';
import RemotePage from './RemotePage';

jest.mock('@dojo/framework/i18n/i18n', () => ({
	default: {
		locale: 'en-US'
	}
}));
jest.mock('../../scripts/compile-remote.block');

describe('Page', () => {
	const mockCompiler = jest.spyOn(compiler, 'default').mockReturnValue('Some content' as any);

	it('renders without left menu', () => {
		const h = harness(() => <RemotePage repo="dojo/framework" path="path/to/file.md" />);

		expect(mockCompiler).toHaveBeenCalledWith({ repo: 'dojo/framework', path: 'path/to/file.md', locale: 'en' });

		h.expect(() => <Page hasLeftSideMenu={false}>Some content</Page>);
	});

	it('renders with left menu', () => {
		const h = harness(() => <RemotePage repo="dojo/framework" path="path/to/file.md" hasLeftSideMenu />);

		expect(mockCompiler).toHaveBeenCalledWith({ repo: 'dojo/framework', path: 'path/to/file.md', locale: 'en' });

		h.expect(() => <Page hasLeftSideMenu>Some content</Page>);
	});

	it('renders with branch', () => {
		const h = harness(() => <RemotePage repo="dojo/framework" branch="branch" path="path/to/file.md" />);

		expect(mockCompiler).toHaveBeenCalledWith({
			repo: 'dojo/framework',
			branch: 'branch',
			path: 'path/to/file.md',
			locale: 'en'
		});

		h.expect(() => <Page hasLeftSideMenu={false}>Some content</Page>);
	});
});
