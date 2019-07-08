import Block from '@dojo/framework/core/meta/Block';
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';

import compileBlogIndexBlock from '../scripts/compile-blog-index.block';
import Landing from '../widgets/landing/Landing';
import Post from './BlogPost';

import { MockMetaMixin } from '../test/util/MockMeta';

import Blog from './Blog';
import * as css from './Blog.m.css';
import { blogPost1Excerpt, blogPost2Excerpt, blogPost3, blogPost4 } from '../test/blog-posts.mock';

describe('Blog', () => {
	it('renders', () => {
		const mockMetaMixin = new MockMetaMixin(Blog);
		const mockCompileBlogIndexBlock = jest
			.fn()
			.mockReturnValue([blogPost1Excerpt, blogPost2Excerpt, blogPost3, blogPost4]);
		mockMetaMixin.registerMetaCallOnce(Block, 'run', [compileBlogIndexBlock], mockCompileBlogIndexBlock);

		const BlogMock = mockMetaMixin.getClass();
		const h = harness(() => <BlogMock />);
		h.expect(() => (
			<Landing classes={{ 'dojo.io/Landing': { root: [css.root] } }}>
				<Post key={blogPost1Excerpt.file} post={blogPost1Excerpt} excerpt />
				<Post key={blogPost2Excerpt.file} post={blogPost2Excerpt} excerpt />
				<Post key={blogPost3.file} post={blogPost3} excerpt />
				<Post key={blogPost4.file} post={blogPost4} excerpt />
			</Landing>
		));

		expect(mockCompileBlogIndexBlock).toHaveBeenCalledWith({ locale: 'en' });
	});
});
