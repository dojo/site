import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';

import Examples from './Examples';
import * as css from './Examples.m.css';

describe('Examples', () => {
	it('renders', () => {
		const h = harness(() => <Examples />);
		h.expect(() => (
			<div>
				<h1 classes={[css.root]}>Examples</h1>
			</div>
		));
	});
});
