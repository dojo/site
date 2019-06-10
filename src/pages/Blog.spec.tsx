import Block from '@dojo/framework/widget-core/meta/Block';
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';

import compileBlogIndexBlock from '../scripts/compile-blog-index.block';
import Landing from '../widgets/landing/Landing';
import Post from './BlogPost';

import { MockMetaMixin } from '../test/util/MockMeta';

import Blog from './Blog';
import * as css from './Blog.m.css';

describe('Blog', () => {
	it('renders', () => {
		const mockMetaMixin = new MockMetaMixin(Blog);

		mockMetaMixin.registerMetaCallOnce(Block, 'run', [compileBlogIndexBlock], () => ['a', 'b', 'c']);

		const BlogMock = mockMetaMixin.getClass();
		const h = harness(() => <BlogMock />);
		h.expect(() => (
			<Landing classes={{ 'dojo.io/Landing': { root: [css.root] } }}>
				<Post path="a" excerpt />
				<Post path="b" excerpt />
				<Post path="c" excerpt />
			</Landing>
		));
	});
});
