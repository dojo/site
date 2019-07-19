import { WNode } from '@dojo/framework/core/interfaces';
import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';

import * as css from './Card.m.css';

export interface CardProperties {
	header?: WNode;
	footer?: WNode;
	dark?: boolean;
	depth?: 1 | 4;
}

const factory = create({ theme }).properties<CardProperties>();

export default factory(function Card({ middleware: { theme }, properties, children }) {
	const { header, footer, dark = false, depth = 1 } = properties();
	const themedCss = theme.classes(css);

	return (
		<div
			key="card"
			data-test="card"
			classes={[themedCss.root, dark ? themedCss.dark : null, depth === 4 ? themedCss.depth4 : null]}
		>
			{header}
			<div key="content" data-test="content" classes={themedCss.content}>
				{children()}
			</div>
			{footer}
		</div>
	);
});
