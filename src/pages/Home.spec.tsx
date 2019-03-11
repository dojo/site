import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';
import { add } from '@dojo/framework/has/has';

import Home from './Home';
import * as css from './Home.m.css';
import Hero from './home/hero/Hero';
import Ethos from './home/ethos/Ethos';
import GetGoing from './home/getgoing/GetGoing';
import Features from './home/features/Features';

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
