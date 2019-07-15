import WidgetBase from '@dojo/framework/core/WidgetBase';
import { Params } from '@dojo/framework/routing/interfaces';
import { tsx } from '@dojo/framework/core/vdom';
import { ThemedMixin, theme } from '@dojo/framework/core/mixins/Themed';
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
				<div classes={this.theme(css.root)}>
					<a classes={this.theme(css.link)} href={url} target="_blank" />
					{card}
				</div>
			);
		}

		if (outlet) {
			return (
				<div classes={this.theme(css.root)}>
					<Link classes={this.theme(css.link)} to={outlet} params={params} />
					{card}
				</div>
			);
		}
		return card;
	}
}
