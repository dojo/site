import WidgetBase from '@dojo/framework/core/WidgetBase';
import { tsx } from '@dojo/framework/core/vdom';
import ThemedMixin, { theme, ThemedProperties } from '@dojo/framework/core/mixins/Themed';
import { Params } from '@dojo/framework/routing/interfaces';

import { IconName, IconLookup, IconPrefix } from '@fortawesome/fontawesome-svg-core';

import LinkedCard from '../card/LinkedCard';
import CardIconHeader, { IconHeaderBackgroundColor } from '../card/CardIconHeader';

import * as css from './LandingLink.m.css';

interface LandingLinkProperties extends ThemedProperties {
	to: string;
	params?: Params;
	title: string;
	icon: IconName | IconLookup | [IconPrefix, IconName];
	color?: IconHeaderBackgroundColor;
}

@theme(css)
export default class LandingLink extends ThemedMixin(WidgetBase)<LandingLinkProperties> {
	protected render() {
		const { title, to, params, icon, color = 'blue' } = this.properties;

		return (
			<div classes={this.theme(css.root)}>
				<LinkedCard header={<CardIconHeader icon={icon} background={color} />} outlet={to} params={params}>
					<h4 classes={this.theme(css.title)}>{title}</h4>
					{this.children}
				</LinkedCard>
			</div>
		);
	}
}
