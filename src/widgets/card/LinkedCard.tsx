import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { Params } from '@dojo/framework/routing/interfaces';
import { tsx } from '@dojo/framework/widget-core/tsx';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import Link from '@dojo/framework/routing/Link';

import Card from './Card';

import * as css from './LinkedCard.m.css';

export interface LinkedCardProperties {
	url?: string;
	outlet?: string;
	params?: Params | string;
}

@theme(css)
export default class LinkedCard extends ThemedMixin(WidgetBase)<LinkedCardProperties> {
	private _renderCard(): DNode {
		return <Card>{this.children}</Card>;
	}

	protected render(): DNode {
		const { url, outlet, params } = this.properties;

		if (url) {
			return (
				<a classes={this.theme(css.root)} href={url}>
					{this._renderCard()}
				</a>
			);
		}

		if (outlet) {
			let finalParams: Params | undefined;
			if (typeof params === 'string') {
				try {
					finalParams = JSON.parse(params) as Params;
				} catch {}
			} else {
				finalParams = params;
			}
			return (
				<Link classes={this.theme(css.root)} to={outlet} params={finalParams}>
					{this._renderCard()}
				</Link>
			);
		}
		return this._renderCard();
	}
}
