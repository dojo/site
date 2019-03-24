import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { WNode } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, theme, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { tsx } from '@dojo/framework/widget-core/tsx';

import * as css from './Card.m.css';

export interface CardProperties extends ThemedProperties {
	header?: WNode;
	footer?: WNode;
	dark?: boolean;
	depth?: 1 | 4;
}

@theme(css)
export default class Card extends ThemedMixin(WidgetBase)<CardProperties> {
	protected render() {
		const { header, footer, dark = false, depth = 1 } = this.properties;

		return (
			<div
				key="card"
				data-test="card"
				classes={[
					this.theme(css.root),
					dark ? this.theme(css.dark) : null,
					depth === 4 ? this.theme(css.depth4) : null
				]}
			>
				{header}
				<div key="content" data-test="content" classes={this.theme(css.content)}>
					{this.children}
				</div>
				{footer}
			</div>
		);
	}
}
