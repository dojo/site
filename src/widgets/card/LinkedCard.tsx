import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { Params } from '@dojo/framework/routing/interfaces';
import { tsx } from '@dojo/framework/widget-core/tsx';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import Link from '@dojo/framework/routing/Link';

import Card, { CardProperties } from './Card';

import * as css from './LinkedCard.m.css';

export interface LinkedCardProperties extends CardProperties {
	url?: string;
	outlet?: string;
	params?: Params;
}

@theme(css)
export default class LinkedCard extends ThemedMixin(WidgetBase)<LinkedCardProperties> {
	protected render() {
		const { url, outlet, params, ...cardProperties } = this.properties;
		const card = <Card {...cardProperties}>{this.children}</Card>;

		if (url) {
			return (
				<a classes={this.theme(css.root)} href={url} target="_blank">
					{card}
				</a>
			);
		}

		if (outlet) {
			return (
				<Link classes={this.theme(css.root)} to={outlet} params={params}>
					{card}
				</Link>
			);
		}
		return card;
	}
}
