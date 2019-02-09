import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import * as css from './Card.m.css';
import { tsx } from '@dojo/framework/widget-core/tsx';

export interface CardProperties {
	title?: string;
	header?: DNode;
	image?:
		| {
				src: string;
				alt?: string;
		  }
		| string;
	footer?: DNode | DNode[];
}

@theme(css)
export default class Card extends ThemedMixin(WidgetBase)<CardProperties> {
	protected render(): DNode {
		const { title, header, image, footer } = this.properties;

		return (
			<div data-test="card" classes={this.theme(css.root)}>
				{title || header ? (
					<header key="header" data-test="header" classes={this.theme(css.header)}>
						{header
							? header
							: [image && <img {...(typeof image === 'string' ? { src: image } : image)} />, title]}
					</header>
				) : null}
				<div classes={this.theme(css.content)}>{this.children}</div>
				{footer ? (
					<footer data-test="footer" classes={this.theme(css.footer)}>
						{footer}
					</footer>
				) : (
					undefined
				)}
			</div>
		);
	}
}
