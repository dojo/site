import { Params } from '@dojo/framework/routing/interfaces';
import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import Link from '@dojo/framework/routing/Link';

import Card, { CardProperties } from './Card';

import * as css from './LinkedCard.m.css';

export interface LinkedCardProperties extends CardProperties {
	url?: string;
	outlet?: string;
	params?: Params;
}

const factory = create({ theme }).properties<LinkedCardProperties>();

export default factory(function LinkedCard({ middleware: { theme }, properties, children }) {
	const themedCss = theme.classes(css);

	const { url, outlet, params, ...cardProperties } = properties();
	const card = <Card {...cardProperties}>{children()}</Card>;

	if (url) {
		return (
			<div classes={themedCss.root}>
				<a classes={themedCss.link} href={url} target="_blank" rel="noopener noreferrer" />
				{card}
			</div>
		);
	}

	if (outlet) {
		return (
			<div classes={themedCss.root}>
				<Link classes={themedCss.link} to={outlet} params={params} />
				{card}
			</div>
		);
	}
	return card;
});
