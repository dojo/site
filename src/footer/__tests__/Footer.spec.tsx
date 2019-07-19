import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';

import * as css from '../Footer.m.css';
import Footer from '../Footer';

describe('Footer', () => {
	it('renders', () => {
		const h = harness(() => <Footer />);
		h.expect(() => <footer classes={css.root}>© 2019 JS Foundation, All Rights Reserved.</footer>);
	});
});
