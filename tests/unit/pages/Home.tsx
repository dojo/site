const { describe, it } = intern.getInterface('bdd');
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';

import Home from '../../../src/pages/Home';
import * as css from '../../../src/pages/Home.m.css';

describe('Home', () => {
	it('renders', () => {
		const h = harness(() => <Home />);
		h.expect(() => (
			<div><h1 classes={[css.root]}>Home</h1></div>
		));
	});
});
