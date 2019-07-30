import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';

import Card from '../card/Card';

import * as css from './Ethos.m.css';

const factory = create({ theme });

export default factory(function Ethos({ middleware: { theme } }) {
	const themedCss = theme.classes(css);

	return (
		<section classes={[themedCss.root]}>
			<Card classes={{ 'dojo.io/Card': { root: [themedCss.ethosPoint], content: [themedCss.ethosContent] } }}>
				<div classes={[themedCss.ethosTitleContainer]}>
					<h3 classes={[themedCss.ethosTitle]}>Productive</h3>
				</div>
				<div>
					Dojo enables teams to build web applications with a deliberate approach to productivity,
					sustainability and code management.
				</div>
			</Card>
			<Card classes={{ 'dojo.io/Card': { root: [themedCss.ethosPoint], content: [themedCss.ethosContent] } }}>
				<div classes={[themedCss.ethosTitleContainer]}>
					<h3 classes={[themedCss.ethosTitle]}>Adaptable</h3>
				</div>
				<div>
					Intent on not reinventing the wheel, Dojo allows for easy integration with the most powerful
					solutions available today on the open web.
				</div>
			</Card>
			<Card classes={{ 'dojo.io/Card': { root: [themedCss.ethosPoint], content: [themedCss.ethosContent] } }}>
				<div classes={[themedCss.ethosTitleContainer]}>
					<h3 classes={[themedCss.ethosTitle]}>Inclusive</h3>
				</div>
				<div>
					Demand for accessibility and internationalization are required for enterprise web applications. Dojo
					supports inclusivity and provides both.
				</div>
			</Card>
		</section>
	);
});
