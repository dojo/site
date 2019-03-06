import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';

import Subsection from './Subsection';
import * as css from './Subsection.m.css';

describe('Subsection', () => {
	it('renders', () => {
		const h = harness(() => <Subsection>1337</Subsection>);
		h.expect(() => <div classes={css.root}>1337</div>);
	});
});
