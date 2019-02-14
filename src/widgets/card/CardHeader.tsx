import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import { tsx } from '@dojo/framework/widget-core/tsx';

import * as css from './CardHeader.m.css';

export interface CardHeaderProperties {
	title?: string;
	image?: {
		src: string;
		alt?: string;
	}
}

@theme(css)
export default class CardHeader extends ThemedMixin(WidgetBase)<CardHeaderProperties> {
	protected render() {
		const { title, image } = this.properties;

		let children = this.children.length > 0 ? this.children : null;
		if (!children && title) {
			children = [
				image && (
					<img classes={css.image} src={image.src} alt={image.alt || title} />
				),
				title
			];
		}

		return (
			<header key="card-header" data-test="card-header" classes={this.theme(css.root)}>
				{children}
			</header>
		);
    }
}
