import WidgetBase from '@dojo/framework/core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/framework/core/mixins/Themed';
import { tsx } from '@dojo/framework/core/vdom';

import * as css from './CardFooter.m.css';

@theme(css)
export default class CardFooter extends ThemedMixin(WidgetBase) {
	protected render() {
		return (
			<footer key="card-footer" data-test="footer" classes={this.theme(css.root)}>
				{this.children}
			</footer>
		);
	}
}
