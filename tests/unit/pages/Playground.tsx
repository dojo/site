const { describe, it } = intern.getInterface('bdd');
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';

import Playground from '../../../src/pages/Playground';
import * as css from '../../../src/pages/Playground.m.css';

describe('Playground', () => {
	it('renders', () => {
		const src = 'https://codesandbox.io/embed/github/dojo/dojo-codesandbox-template/tree/master/?autoresize=1&hidenavigation=1';
		const h = harness(() => <Playground />);
		h.expect(() => (
			<iframe classes={[css.iframe]} src={ src }></iframe>
		));
	});
});
