import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import Link from '@dojo/framework/routing/Link';

import * as css from './Hero.m.css';

const hero = require('../assets/herobg.jpg');

const factory = create({ theme });

export default factory(function Hero({ middleware: { theme } }) {
	const themedCss = theme.classes(css);

	return (
		<section styles={{ backgroundImage: `url(${hero})` }} classes={[themedCss.root]}>
			<h1 classes={[themedCss.headline]}>A Progressive Framework for Modern Web Apps</h1>
			<Link to="learn" classes={[themedCss.build]}>
				Build with Dojo
			</Link>
		</section>
	);
});
