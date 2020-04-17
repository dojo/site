import harness from '@dojo/framework/testing/harness/harness';
import { tsx } from '@dojo/framework/core/vdom';
import Route from '@dojo/framework/routing/Route';

import Post from '../BlogPost';

import BlogPosts from '../BlogPosts';

describe('Blog Posts', () => {
	it('renders', () => {
		const h = harness(() => <BlogPosts />);
		h.expect(() => <Route key="blog-post" id="blog-post" renderer={() => 'anything'} />);
	});

	it('outlet render content', () => {
		const h = harness(() => <BlogPosts />);

		const renderer = h.trigger(`@blog-post`, 'renderer', { router: { link: () => {} }, params: { path: 'path' } });
		h.expect(
			() => <Post url={undefined} path="blog/en/path.md" standalone />,
			() => renderer
		);
	});
});
