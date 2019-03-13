import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';

import * as compiler from '../../scripts/compile-local.block';

import Page from './Page';
import LocalPage from './LocalPage';

jest.mock('@dojo/framework/i18n/i18n', () => ({
	default: {
		locale: 'en-US'
	}
}));
jest.mock('../../scripts/compile-local.block');

describe('Page', () => {
	const mockCompiler = jest.spyOn(compiler, 'default').mockReturnValue('Some content' as any);

	it('renders without left menu', () => {
		const h = harness(() => <LocalPage path="path/to/file.md" />);

		expect(mockCompiler).toHaveBeenCalledWith({ path: 'path/to/file.md', locale: 'en' });

		h.expect(() => <Page hasLeftSideMenu={false}>Some content</Page>);
	});

	it('renders with left menu', () => {
		const h = harness(() => <LocalPage path="path/to/file.md" hasLeftSideMenu />);

		expect(mockCompiler).toHaveBeenCalledWith({ path: 'path/to/file.md', locale: 'en' });

		h.expect(() => <Page hasLeftSideMenu>Some content</Page>);
	});

	it('renders only content without Page widget', () => {
		const h = harness(() => <LocalPage path="path/to/file.md" warpInPage={false} />);

		expect(mockCompiler).toHaveBeenCalledWith({ path: 'path/to/file.md', locale: 'en' });

		h.expect(() => 'Some content');
	});
});
