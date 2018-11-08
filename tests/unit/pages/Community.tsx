const { describe, it } = intern.getInterface('bdd');
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';

import Community from '../../../src/pages/Community';
import * as css from '../../../src/pages/Community.m.css';

describe('Community', () => {
	it('renders', () => {
		const h = harness(() => <Community />);
		h.expect(() => (
			<div><h1 classes={[css.root]}>Community</h1></div>
		));
	});
});
