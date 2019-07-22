import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';

import * as css from './CardHeader.m.css';

export interface CardHeaderProperties {
	title?: string;
	image?: {
		src: string;
		alt?: string;
	};
}

const factory = create({ theme }).properties<CardHeaderProperties>();

export default factory(function CardHeader({ middleware: { theme }, properties, children }) {
	const themedCss = theme.classes(css);

	const { title, image } = properties();

	let content = children();
	if (!content.length && title) {
		content = [image && <img classes={themedCss.image} src={image.src} alt={image.alt || title} />, title];
	}

	return (
		<header key="card-header" data-test="card-header" classes={themedCss.root}>
			{content}
		</header>
	);
});
