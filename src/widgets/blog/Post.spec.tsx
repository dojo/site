import Block from '@dojo/framework/widget-core/meta/Block';
import Link from '@dojo/framework/routing/Link';
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import harness from '@dojo/framework/testing/harness';
import { Constructor, WidgetMetaConstructor, MetaBase } from '@dojo/framework/widget-core/interfaces';
import { tsx } from '@dojo/framework/widget-core/tsx';

import LandingSubsection from '../landing/LandingSubsection';
import Post from './Post';

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
	it('renders', () => {
		mockCompileBlock.mockReturnValueOnce({
			meta: {
				author: 'author',
				date: 'date',
				title: 'title'
			},
			content: 'content'
		});
		const PostMock = mockMetaMixin(Post, mockMeta);
		const h = harness(() => <PostMock path="path" />);
		h.expect(() => (
			<LandingSubsection title="title">
				<p>
					{'author'} {'date'}
				</p>
				content
				<p>
					<Link to="some-outlet" params={undefined}>
						READ MORE
					</Link>
				</p>
			</LandingSubsection>
		));
	});
});
