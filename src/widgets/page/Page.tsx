import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import ThemedMixin, { theme, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import * as css from './Page.m.css';

export interface PageProperties extends ThemedProperties {}

@theme(css)
export default class Page extends ThemedMixin(WidgetBase)<PageProperties> {
	protected render() {
		return (
			<div classes={this.theme([css.root])}>
				<div classes={this.theme(css.content)}>{this.children}</div>
			</div>
		);
	}
}
