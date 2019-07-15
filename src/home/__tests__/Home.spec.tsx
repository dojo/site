import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';
import { add } from '@dojo/framework/core/has';

import Home from '../Home';
import * as css from '../Home.m.css';
import Hero from '../Hero';
import Ethos from '../Ethos';
import GetGoing from '../GetGoing';
import Features from '../Features';

describe('Home', () => {
	it('renders', () => {
		add('build-time-render', true, false);
		const h = harness(() => <Home />);
		h.expect(() => (
			<main classes={[css.root]}>
				<Hero />
				<Ethos />
				<GetGoing />
				<Features />
			</main>
		));
	});
});
