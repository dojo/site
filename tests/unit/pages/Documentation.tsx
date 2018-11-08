const { describe, it } = intern.getInterface('bdd');
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';

import Documentation from '../../../src/pages/Documentation';
import * as css from '../../../src/pages/Documentation.m.css';

describe('Documentation', () => {
	it('renders', () => {
		const h = harness(() => <Documentation />);
		h.expect(() => (
			<div><h1 classes={[css.root]}>Documentation</h1></div>
		));
	});
});
