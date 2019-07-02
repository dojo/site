import Block from '@dojo/framework/core/meta/Block';
import WidgetBase from '@dojo/framework/core/WidgetBase';
import harness from '@dojo/framework/testing/harness';
import { Constructor, WidgetMetaConstructor, MetaBase } from '@dojo/framework/core/interfaces';
import { tsx } from '@dojo/framework/core/vdom';

import Landing from '../widgets/landing/Landing';
import Post from './BlogPost';

import Blog from './Blog';
import * as css from './Blog.m.css';

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

describe('Blog', () => {
	it('renders', () => {
		mockCompileBlock.mockReturnValueOnce(['a', 'b', 'c']);
		const BlogMock = mockMetaMixin(Blog, mockMeta);
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
