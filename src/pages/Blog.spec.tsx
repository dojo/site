import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';

import Blog from './Blog';
import * as css from './Blog.m.css';

describe('Blog', () => {
	it('renders', () => {
		const h = harness(() => <Blog />);
		h.expect(() => (
			<div>
				<h1 classes={[css.root]}>Blog</h1>
			</div>
		));
	});
});
