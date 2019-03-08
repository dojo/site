import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import ThemedMixin, { theme, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';

import * as css from './Page.m.css';

export interface PageProperties extends ThemedProperties {
	hasLeftSideMenu?: boolean;
}

@theme(css)
export default class Page extends ThemedMixin(WidgetBase)<PageProperties> {
	protected render() {
		const { hasLeftSideMenu } = this.properties;

		return (
			<div classes={this.theme([css.root, hasLeftSideMenu ? css.contentShiftRight : undefined])}>
				<div classes={this.theme(css.content)}>{this.children}</div>
				<footer classes={this.theme(css.footer)}>
					<span>{`© ${new Date().getFullYear()} JS Foundation, All Rights Reserved.`}</span>
				</footer>
			</div>
		);
	}
}
