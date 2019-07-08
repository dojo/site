import { create, tsx } from '@dojo/framework/core/vdom';

import * as css from './Home.m.css';

import Ethos from './home/ethos/Ethos';
import Hero from './home/hero/Hero';
import Features from './home/features/Features';
import GetGoing from './home/getgoing/GetGoing';

const factory = create();

export default factory(function Home() {
	return (
		<main classes={[css.root]}>
			<Hero />
			<Ethos />
			<GetGoing />
			<Features />
		</main>
	);
});
