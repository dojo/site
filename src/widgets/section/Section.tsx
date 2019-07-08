import WidgetBase from '@dojo/framework/core/WidgetBase';
import { tsx } from '@dojo/framework/core/vdom';
import ThemedMixin, { theme } from '@dojo/framework/core/mixins/Themed';

import * as css from './Section.m.css';

@theme(css)
export default class Section extends ThemedMixin(WidgetBase) {
	protected render() {
		return <div classes={this.theme(css.root)}>{this.children}</div>;
	}
}
