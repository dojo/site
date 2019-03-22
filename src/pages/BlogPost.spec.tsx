import Block from '@dojo/framework/widget-core/meta/Block';
import Link from '@dojo/framework/routing/Link';
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import harness from '@dojo/framework/testing/harness';
import { Constructor, WidgetMetaConstructor, MetaBase } from '@dojo/framework/widget-core/interfaces';
import { tsx } from '@dojo/framework/widget-core/tsx';

import LandingSubsection from '../widgets/landing/LandingSubsection';
import Page from '../widgets/page/Page';

import Post from './BlogPost';
import * as css from './BlogPost.m.css';

const mockMetaMixin = <T extends Constructor<WidgetBase<any>>>(Base: T, mockStub: jest.Mock): T => {
	return class extends Base {
		protected meta<T extends MetaBase>(MetaType: WidgetMetaConstructor<T>): T {
			return mockStub(MetaType);
		}
	};
};

const mockCompileBlock = jest.fn();

const mockBlockRun = jest.fn().mockImplementation((input: any) => {
	return mockCompileBlock;
});

const mockMeta = jest.fn().mockImplementation((input: any) => {
	if (Block) {
		return {
			run: mockBlockRun
		};
	}
});

describe('Post', () => {
	it('renders index page style', () => {
		mockCompileBlock.mockReturnValueOnce({
			meta: {
				author: 'author',
				date: '2018-10-15 12:00:00',
				title: 'title'
			},
			content: 'content'
		});
		const PostMock = mockMetaMixin(Post, mockMeta);
		const h = harness(() => <PostMock path="path" excerpt />);
		h.expect(() => (
			<LandingSubsection classes={{ 'dojo.io/LandingSubsection': { root: [css.root] } }}>
				<Link to="blog-post" params={{ path: 'path' }} classes={css.headerLink}>
					<h1 classes={css.header}>title</h1>
				</Link>
				<p classes={css.meta}>
					{'author'} {'October 15, 2018, 12:00 PM'}
				</p>
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
		mockCompileBlock.mockReturnValueOnce({
			meta: {
				author: 'author',
				date: '2018-10-15 12:00:00',
				title: 'title'
			},
			content: 'content'
		});
		const PostMock = mockMetaMixin(Post, mockMeta);
		const h = harness(() => <PostMock path="path" standalone />);
		h.expect(() => (
			<Page classes={{ 'dojo.io/Page': { root: [css.root] } }}>
				<h1 classes={css.header}>title</h1>
				<p classes={css.meta}>
					{'author'} {'October 15, 2018, 12:00 PM'}
				</p>
				content
			</Page>
		));
	});

	it('does not render if post is not found', () => {
		mockCompileBlock.mockReturnValueOnce(undefined);
		const PostMock = mockMetaMixin(Post, mockMeta);
		const h = harness(() => <PostMock path="path" standalone />);
		h.expect(() => undefined);
	});
});
