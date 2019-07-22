import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';

import Ethos from './Ethos';
import Hero from './Hero';
import Features from './Features';
import GetGoing from './GetGoing';

import * as css from './Home.m.css';

const factory = create({ theme });

export default factory(function Home({ middleware: { theme } }) {
	const themedCss = theme.classes(css);

	return (
		<main classes={[themedCss.root]}>
			<Hero />
			<Ethos />
			<GetGoing />
			<Features />
		</main>
	);
});
