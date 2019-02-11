import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import { tsx } from '@dojo/framework/widget-core/tsx';

import * as css from './CardHeader.m.css';

export interface CardHeaderProperties {
	title?: string;
	image?:
		| {
				src: string;
				alt?: string;
		  }
		| string;
}

@theme(css)
export default class CardHeader extends ThemedMixin(WidgetBase)<CardHeaderProperties> {
	protected render(): DNode {
		const { title, image } = this.properties;

		return (
			<div key="card-header" data-test="card-header" classes={this.theme(css.root)}>
				{title || (this.children && this.children.length > 0) ? (
					<header key="header" data-test="header" classes={this.theme(css.root)}>
						{this.children && this.children.length > 0
							? this.children
							: [
									image && (
										<img
											classes={css.image}
											{...(typeof image === 'string' ? { src: image } : image)}
										/>
									),
									title
							  ]}
					</header>
				) : null}
			</div>
		);
	}
}
