import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';

import Aside from '../Aside';
import * as css from '../Aside.m.css';

describe('Aside', () => {
	it('renders', () => {
		const title = 'Some title';

		const children = 'Some text here';

		const h = harness(() => <Aside title={title}>{children}</Aside>);
		h.expect(() => (
			<article classes={css.root}>
				<strong>{title}</strong>
				<p>{children}</p>
			</article>
		));
	});
});
