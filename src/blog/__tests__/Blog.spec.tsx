import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';
import block from '@dojo/framework/core/middleware/block';

import indexBlock from '../index.block';
import Landing from '../../landing/Landing';
import Post from '../BlogPost';

import createBlockMock from '../../test/mockBlock';

import * as css from '../Blog.m.css';
import Blog from '../Blog';

describe('Blog', () => {
	it('renders', () => {
		const blockMock = createBlockMock([[indexBlock, ['a', 'b', 'c']]]);

		const h = harness(() => <Blog />, { middleware: [[block, blockMock]] });
		h.expect(() => (
			<Landing classes={{ 'dojo.io/Landing': { root: [css.root] } }}>
				<Post path="a" excerpt />
				<Post path="b" excerpt />
				<Post path="c" excerpt />
			</Landing>
		));
	});
});
