import Block from '@dojo/framework/core/meta/Block';
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';

import compileBlogIndexBlock from '../../scripts/compile-blog-index.block';
import Landing from '../../landing/Landing';
import Post from '../BlogPost';

import { MockMetaMixin } from '../../test/util/MockMeta';

import Blog from '../Blog';
import * as css from '../Blog.m.css';

describe('Blog', () => {
	it('renders', () => {
		const mockMetaMixin = new MockMetaMixin(Blog);
		const mockCompileBlogIndexBlock = jest.fn().mockReturnValue(['a', 'b', 'c']);
		mockMetaMixin.registerMetaCallOnce(Block, 'run', [compileBlogIndexBlock], mockCompileBlogIndexBlock);

		const BlogMock = mockMetaMixin.getClass();
		const h = harness(() => <BlogMock />);
		h.expect(() => (
			<Landing classes={{ 'dojo.io/Landing': { root: [css.root] } }}>
				<Post path="a" excerpt />
				<Post path="b" excerpt />
				<Post path="c" excerpt />
			</Landing>
		));

		expect(mockCompileBlogIndexBlock).toHaveBeenCalledWith({ locale: 'en' });
	});
});
