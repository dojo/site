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
		mockMetaMixin.registerMetaCallOnce(Block, 'run', [compileBlogPostBlock], () => ({
			meta: {
				author: 'author',
				date: '2018-10-15 12:00:00',
				title: 'title'
			},
			content: 'content'
		}));

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
	});

	it('renders blog post page style', () => {
		mockMetaMixin.registerMetaCallOnce(Block, 'run', [compileBlogPostBlock], () => ({
			meta: {
				author: 'author',
				date: '2018-10-15 12:00:00',
				title: 'title'
			},
			content: 'content'
		}));

		const PostMock = mockMetaMixin.getClass();
		const h = harness(() => <PostMock path="path" standalone />);
		h.expect(() => (
			<Page classes={{ 'dojo.io/Page': { root: [css.root] } }}>
				<h1 classes={css.header}>title</h1>
				<p classes={css.meta}>author October 15, 2018, 12:00 PM</p>
				content
			</Page>
		));
	});

	it('does not render if post is not found', () => {
		mockMetaMixin.registerMetaCallOnce(Block, 'run', [compileBlogPostBlock], () => undefined);
		const PostMock = mockMetaMixin.getClass();
		const h = harness(() => <PostMock path="path" standalone />);
		h.expect(() => undefined);
	});
});
