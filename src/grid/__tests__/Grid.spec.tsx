import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';

import Grid from '../Grid';
import * as css from '../Grid.m.css';

describe('Card', () => {
	it('default renders', () => {
		const children = ['something', <div>Something Else</div>];

		const h = harness(() => <Grid>{children}</Grid>);
		h.expect(() => (
			<div data-test="grid" classes={css.root}>
				{children}
			</div>
		));
	});
});
