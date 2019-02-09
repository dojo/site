import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { DNode } from '@dojo/framework/widget-core/interfaces';
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
	private _renderCard(cardProperties: CardProperties): DNode {
		return <Card {...cardProperties}>{this.children}</Card>;
	}

	protected render(): DNode {
		const { url, outlet, params, ...cardProperties } = this.properties;

		if (url) {
			return (
				<a classes={this.theme(css.root)} href={url}>
					{this._renderCard(cardProperties)}
				</a>
			);
		}

		if (outlet) {
			return (
				<Link classes={this.theme(css.root)} to={outlet} params={params}>
					{this._renderCard(cardProperties)}
				</Link>
			);
		}

		return this._renderCard(cardProperties);
	}
}
