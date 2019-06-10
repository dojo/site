import Block from '@dojo/framework/widget-core/meta/Block';
import Link from '@dojo/framework/routing/Link';
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';

import compileBlogPostBlock from '../scripts/compile-blog-post.block';
import LandingSubsection from '../widgets/landing/LandingSubsection';
import Page from '../widgets/page/Page';

import { MockMetaMixin } from '../test/util/MockMeta';

import Post from './BlogPost';
import * as css from './BlogPost.m.css';

describe('Post', () => {
	let mockMetaMixin: MockMetaMixin<typeof Post>;
	beforeEach(() => {
		mockMetaMixin = new MockMetaMixin(Post);
	});

	it('renders index page style', () => {
		const mockCompileBlogPostBlock = jest.fn().mockReturnValue({
			meta: {
				author: 'author',
				date: '2018-10-15 12:00:00',
				title: 'title'
			},
			content: 'content'
		});
		mockMetaMixin.registerMetaCallOnce(Block, 'run', [compileBlogPostBlock], mockCompileBlogPostBlock);

		const PostMock = mockMetaMixin.getClass();

		const h = harness(() => <PostMock path="path" excerpt />);
		h.expect(() => (
			<LandingSubsection classes={{ 'dojo.io/LandingSubsection': { root: [css.root] } }}>
				<Link to="blog-post" params={{ path: 'path' }} classes={css.headerLink}>
					<h1 classes={css.header}>title</h1>
				</Link>
				<p classes={css.meta}>author October 15, 2018, 12:00 PM</p>
				content
				<p>
					<Link to="blog-post" params={{ path: 'path' }} classes={css.readMoreLink}>
						READ MORE
					</Link>
				</p>
			</LandingSubsection>
		));

		expect(mockCompileBlogPostBlock).toHaveBeenCalledWith({
			excerpt: true,
			path: 'path'
		});
	});

	it('renders blog post page style', () => {
		const mockCompileBlogPostBlock = jest.fn().mockReturnValue({
			meta: {
				author: 'author',
				date: '2018-10-15 12:00:00',
				title: 'title'
			},
			content: 'content'
		});
		mockMetaMixin.registerMetaCallOnce(Block, 'run', [compileBlogPostBlock], mockCompileBlogPostBlock);

		const PostMock = mockMetaMixin.getClass();
		const h = harness(() => <PostMock path="path" standalone />);
		h.expect(() => (
			<Page classes={{ 'dojo.io/Page': { root: [css.root] } }}>
				<h1 classes={css.header}>title</h1>
				<p classes={css.meta}>author October 15, 2018, 12:00 PM</p>
				content
			</Page>
		));

		expect(mockCompileBlogPostBlock).toHaveBeenCalledWith({
			excerpt: false,
			path: 'path'
		});
	});

	it('does not render if post is not found', () => {
		const mockCompileBlogPostBlock = jest.fn().mockReturnValue(undefined);
		mockMetaMixin.registerMetaCallOnce(Block, 'run', [compileBlogPostBlock], mockCompileBlogPostBlock);
		const PostMock = mockMetaMixin.getClass();
		const h = harness(() => <PostMock path="path" standalone />);
		h.expect(() => undefined);

		expect(mockCompileBlogPostBlock).toHaveBeenCalledWith({
			excerpt: false,
			path: 'path'
		});
	});
});
