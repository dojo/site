import WidgetBase from '@dojo/framework/core/WidgetBase';
import { tsx } from '@dojo/framework/core/vdom';
import ThemedMixin, { theme, ThemedProperties } from '@dojo/framework/core/mixins/Themed';

import * as css from './Landing.m.css';

@theme(css)
export default class Landing extends ThemedMixin(WidgetBase)<ThemedProperties> {
	protected render() {
		return <div classes={this.theme(css.root)}>{this.children}</div>;
	}
}
