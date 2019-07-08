import Block from '@dojo/framework/core/meta/Block';
import Link from '@dojo/framework/routing/Link';
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';

import compileBlogPostBlock from '../scripts/compile-blog-post.block';
import LandingSubsection from '../widgets/landing/LandingSubsection';
import Page from '../widgets/page/Page';

import { MockMetaMixin } from '../test/util/MockMeta';
import { blogPost2Full, blogPost2Excerpt } from '../test/blog-posts.mock';

import Post, { formatDate } from './BlogPost';
import * as css from './BlogPost.m.css';

describe('Post', () => {
	let mockMetaMixin: MockMetaMixin<typeof Post>;
	beforeEach(() => {
		mockMetaMixin = new MockMetaMixin(Post);
	});

	it('renders from provided post', () => {
		const PostMock = mockMetaMixin.getClass();

		const h = harness(() => <PostMock post={blogPost2Excerpt} excerpt />);
		h.expect(() => (
			<LandingSubsection classes={{ 'dojo.io/LandingSubsection': { root: [css.root] } }}>
				<Link to="blog-post" params={{ path: 'version-6-dojo' }} classes={css.headerLink}>
					<h1 classes={css.header}>Announcing Version 6 of Dojo</h1>
				</Link>
				<p classes={css.meta}>{`Anthony Gubler ${formatDate(blogPost2Excerpt.meta.date as string)}`}</p>
				{blogPost2Excerpt.content}
				<p>
					<Link to="blog-post" params={{ path: 'version-6-dojo' }} classes={css.readMoreLink}>
						READ MORE
					</Link>
				</p>
			</LandingSubsection>
		));
	});

	it('renders excerpt style', () => {
		const mockCompileBlogPostBlock = jest.fn().mockReturnValue(blogPost2Excerpt);
		mockMetaMixin.registerMetaCallOnce(Block, 'run', [compileBlogPostBlock], mockCompileBlogPostBlock);

		const PostMock = mockMetaMixin.getClass();

		const h = harness(() => <PostMock path="version-6-dojo" excerpt />);
		h.expect(() => (
			<LandingSubsection classes={{ 'dojo.io/LandingSubsection': { root: [css.root] } }}>
				<Link to="blog-post" params={{ path: 'version-6-dojo' }} classes={css.headerLink}>
					<h1 classes={css.header}>Announcing Version 6 of Dojo</h1>
				</Link>
				<p classes={css.meta}>{`Anthony Gubler ${formatDate(blogPost2Excerpt.meta.date as string)}`}</p>
				{blogPost2Excerpt.content}
				<p>
					<Link to="blog-post" params={{ path: 'version-6-dojo' }} classes={css.readMoreLink}>
						READ MORE
					</Link>
				</p>
			</LandingSubsection>
		));

		expect(mockCompileBlogPostBlock).toHaveBeenCalledWith({
			excerpt: true,
			path: 'version-6-dojo'
		});
	});

	it('renders blog post page style', () => {
		const mockCompileBlogPostBlock = jest.fn().mockReturnValue(blogPost2Full);
		mockMetaMixin.registerMetaCallOnce(Block, 'run', [compileBlogPostBlock], mockCompileBlogPostBlock);

		const PostMock = mockMetaMixin.getClass();
		const h = harness(() => <PostMock path="version-6-dojo" standalone />);
		h.expect(() => (
			<Page classes={{ 'dojo.io/Page': { root: [css.root] } }}>
				<h1 classes={css.header}>Announcing Version 6 of Dojo</h1>
				<p classes={css.meta}>{`Anthony Gubler ${formatDate(blogPost2Full.meta.date as string)}`}</p>
				{blogPost2Full.content}
			</Page>
		));

		expect(mockCompileBlogPostBlock).toHaveBeenCalledWith({
			excerpt: false,
			path: 'version-6-dojo'
		});
	});

	it('does not render if post is not found', () => {
		const mockCompileBlogPostBlock = jest.fn().mockReturnValue(undefined);
		mockMetaMixin.registerMetaCallOnce(Block, 'run', [compileBlogPostBlock], mockCompileBlogPostBlock);
		const PostMock = mockMetaMixin.getClass();
		const h = harness(() => <PostMock path="version-6-dojo" standalone />);
		h.expect(() => undefined);

		expect(mockCompileBlogPostBlock).toHaveBeenCalledWith({
			excerpt: false,
			path: 'version-6-dojo'
		});
	});
});
