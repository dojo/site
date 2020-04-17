import Link from '@dojo/framework/routing/Link';
import harness from '@dojo/framework/testing/harness/harness';
import { tsx } from '@dojo/framework/core/vdom';
import block from '@dojo/framework/core/middleware/block';

import postBlock from '../post.block';
import LandingSubsection from '../../landing/LandingSubsection';
import Page from '../../page/Page';

import createBlockMock from '../../test/mockBlock';

import * as css from '../BlogPost.m.css';
import BlogPost from '../BlogPost';

jest.unmock('@dojo/framework/core/util');

describe('BlogPost', () => {
	it('renders index page style', () => {
		const mockPostBlock = jest.fn();
		mockPostBlock.mockReturnValue({
			meta: {
				author: 'author',
				date: '2018-10-15 12:00:00',
				title: 'title'
			},
			content: (
				<div>
					Content
					<a href="#anchor">Link</a>
					<a href="http://link.to/somewhere">Link 2</a>
				</div>
			)
		});
		const mockBlock = createBlockMock([[postBlock, mockPostBlock]]);

		const h = harness(() => <BlogPost path="path" excerpt url="url" />, { middleware: [[block, mockBlock]] });
		h.expect(() => (
			<LandingSubsection classes={{ 'dojo.io/LandingSubsection': { root: [css.root] } }}>
				<Link to="blog-post" params={{ path: 'path' }} classes={css.headerLink}>
					<h1 classes={css.header}>title</h1>
				</Link>
				<p classes={css.meta}>author October 15, 2018, 12:00 PM</p>
				<div>
					Content
					<a href="url#anchor">Link</a>
					<a href="http://link.to/somewhere">Link 2</a>
				</div>
				<p>
					<Link to="blog-post" params={{ path: 'path' }} classes={css.readMoreLink}>
						READ MORE
					</Link>
				</p>
			</LandingSubsection>
		));
	});

	it('renders blog post page style', () => {
		const mockPostBlock = jest.fn();
		mockPostBlock.mockReturnValue({
			meta: {
				author: 'author',
				date: '2018-10-15 12:00:00',
				title: 'title'
			},
			content: (
				<div>
					Content
					<a href="#anchor">Link</a>
					<a href="http://link.to/somewhere">Link 2</a>
				</div>
			)
		});
		const mockBlock = createBlockMock([[postBlock, mockPostBlock]]);

		const h = harness(() => <BlogPost path="path" standalone url="url" />, { middleware: [[block, mockBlock]] });
		h.expect(() => (
			<Page classes={{ 'dojo.io/Page': { root: [css.root] } }}>
				<h1 classes={css.header}>title</h1>
				<p classes={css.meta}>author October 15, 2018, 12:00 PM</p>
				<div>
					Content
					<a href="url#anchor">Link</a>
					<a href="http://link.to/somewhere">Link 2</a>
				</div>
			</Page>
		));
	});

	it('does not render if post is not found', () => {
		const mockPostBlock = jest.fn();
		mockPostBlock.mockReturnValue(undefined);
		const mockBlock = createBlockMock([[postBlock, mockPostBlock]]);

		const h = harness(() => <BlogPost path="path" standalone />, { middleware: [[block, mockBlock]] });
		h.expect(() => undefined);
	});
});
