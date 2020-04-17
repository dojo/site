import assertionTemplate from '@dojo/framework/testing/harness/assertionTemplate';
import harness from '@dojo/framework/testing/harness/harness';
import { tsx } from '@dojo/framework/core/vdom';
import block from '@dojo/framework/core/middleware/block';
import i18n from '@dojo/framework/core/middleware/i18n';

import indexBlock from '../index.block';
import Landing from '../../landing/Landing';
import Post from '../BlogPost';

import createBlockMock from '../../test/mockBlock';
import createI18nMock from '../../test/mockI18n';

import * as css from '../Blog.m.css';
import Blog from '../Blog';

describe('Blog', () => {
	const baseAssertion = assertionTemplate(() => (
		<Landing classes={{ 'dojo.io/Landing': { root: [css.root] } }}>
			<div key="a">
				<Post key="a" url={undefined} path="a" excerpt />
			</div>
			<div key="b">
				<Post key="b" url={undefined} path="b" excerpt />
			</div>
			<div key="c">
				<Post key="c" url={undefined} path="c" excerpt />
			</div>
		</Landing>
	));

	it('renders', () => {
		const mockIndexBlock = jest.fn();
		mockIndexBlock.mockReturnValue(['a', 'b', 'c']);
		const blockMock = createBlockMock([[indexBlock, mockIndexBlock]]);

		const h = harness(() => <Blog />, { middleware: [[block, blockMock]] });
		h.expect(baseAssertion);

		expect(mockIndexBlock).toHaveBeenCalledWith({ language: 'en', locale: 'en' });
	});

	it('renders in another language', () => {
		const mockIndexBlock = jest.fn();
		mockIndexBlock.mockReturnValue(['a', 'b', 'c']);
		const blockMock = createBlockMock([[indexBlock, mockIndexBlock]]);

		const mockI18n = createI18nMock('zh-CN');

		const h = harness(() => <Blog />, {
			middleware: [
				[block, blockMock],
				[i18n, mockI18n]
			]
		});
		h.expect(baseAssertion);

		expect(mockIndexBlock).toHaveBeenCalledWith({ language: 'zh', locale: 'zh-CN' });
	});
});
