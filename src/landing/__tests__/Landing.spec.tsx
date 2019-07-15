import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';

import Landing from '../Landing';
import * as css from '../Landing.m.css';

describe('Landing', () => {
	it('renders', () => {
		const h = harness(() => <Landing>1337</Landing>);
		h.expect(() => <div classes={css.root}>1337</div>);
	});
});
