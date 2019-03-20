import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';
import { add } from '@dojo/framework/has/has';

import Playground from './Playground';
import * as css from './Playground.m.css';

describe('Playground', () => {
	it('renders', () => {
		const src =
			'https://codesandbox.io/embed/github/dojo/dojo-codesandbox-template/tree/master/?autoresize=1&hidenavigation=1';

		add('build-time-render', false, true);

		const h = harness(() => <Playground />);

		h.expect(() => <iframe classes={[css.iframe]} src={src} />);
	});

	it('does not render during BTR', () => {
		add('build-time-render', true, true);

		const h = harness(() => <Playground />);

		h.expect(() => undefined);
	});
});
