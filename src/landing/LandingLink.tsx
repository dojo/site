import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import { Params } from '@dojo/framework/routing/interfaces';

import { IconName, IconLookup, IconPrefix } from '@fortawesome/fontawesome-svg-core';

import LinkedCard from '../card/LinkedCard';
import CardIconHeader, { IconHeaderBackgroundColor } from '../card/CardIconHeader';

import * as css from './LandingLink.m.css';

interface LandingLinkProperties {
	to: string;
	params?: Params;
	title: string;
	icon: IconName | IconLookup | [IconPrefix, IconName];
	color?: IconHeaderBackgroundColor;
}

const factory = create({ theme }).properties<LandingLinkProperties>();

export default factory(function LandingLink({ middleware: { theme }, children, properties }) {
	const { title, to, params, icon, color = 'blue' } = properties();
	const themedCss = theme.classes(css);

	return (
		<div classes={themedCss.root}>
			<LinkedCard header={<CardIconHeader icon={icon} background={color} />} outlet={to} params={params}>
				<h4 classes={themedCss.title}>{title}</h4>
				{children()}
			</LinkedCard>
		</div>
	);
});
