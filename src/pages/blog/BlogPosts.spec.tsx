import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Outlet from '@dojo/framework/routing/Outlet';

import Post from '../BlogPost';

import BlogPosts from './BlogPosts';

describe('Blog Posts', () => {
	it('renders', () => {
		const h = harness(() => <BlogPosts />);
		h.expect(() => <Outlet key="blog-post" id="blog-post" renderer={() => 'anything'} />);
	});

	it('outlet render content', () => {
		const h = harness(() => <BlogPosts />);

		const renderer = h.trigger(`@blog-post`, 'renderer', { params: { path: 'path' } });
		h.expect(() => <Post path="blog/en/path.md" standalone />, () => renderer);
	});
});
