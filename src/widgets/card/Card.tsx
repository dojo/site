import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { WNode } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, theme, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { tsx } from '@dojo/framework/widget-core/tsx';

import * as css from './Card.m.css';

export interface CardProperties extends ThemedProperties {
	header?: WNode;
	footer?: WNode;
	dark?: boolean;
}

@theme(css)
export default class Card extends ThemedMixin(WidgetBase)<CardProperties> {
	protected render() {
		const { header, footer, dark = false } = this.properties;

		return (
			<div key="card" data-test="card" classes={[this.theme(css.root), dark ? this.theme(css.dark) : null]}>
				{header}
				<div key="content" data-test="content" classes={this.theme(css.content)}>
					{this.children}
				</div>
				{footer}
			</div>
		);
	}
}
