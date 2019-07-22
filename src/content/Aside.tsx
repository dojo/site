import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';

import * as css from './Aside.m.css';

interface AsideProperties {
	title: string;
}

const factory = create({ theme }).properties<AsideProperties>();

export default factory(function Aside({ middleware: { theme }, properties, children }) {
	const { title } = properties();
	const themedCss = theme.classes(css);

	return (
		<article classes={themedCss.root}>
			<strong>{title}</strong>
			<p>{children()}</p>
		</article>
	);
});
