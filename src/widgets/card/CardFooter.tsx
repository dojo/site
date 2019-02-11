import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import { tsx } from '@dojo/framework/widget-core/tsx';

import * as css from './CardFooter.m.css';

interface CardFooterProperties {
	slot?: 'footer';
}

@theme(css)
export default class CardFooter extends ThemedMixin(WidgetBase)<CardFooterProperties> {
	protected render(): DNode {
		return (
			<footer key="card-footer" data-test="footer" classes={this.theme(css.root)}>
				{this.children}
			</footer>
		);
	}
}
