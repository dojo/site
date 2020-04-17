import harness from '@dojo/framework/testing/harness/harness';
import { tsx } from '@dojo/framework/core/vdom';
import { add } from '@dojo/framework/core/has';
import Link from '@dojo/framework/routing/Link';
import * as css from '../Hero.m.css';
import Hero from '../Hero';
const hero = require('../assets/herobg.png');

describe('Hero', () => {
	it('renders', () => {
		add('build-time-render', true, false);
		const h = harness(() => <Hero />);
		h.expect(() => (
			<section styles={{ backgroundImage: `url(${hero})` }} classes={[css.root]}>
				<h1 classes={[css.headline]}>A Progressive Framework for Modern Web Apps</h1>
				<Link to="learn" classes={[css.build]}>
					Build with Dojo
				</Link>
			</section>
		));
	});
});
