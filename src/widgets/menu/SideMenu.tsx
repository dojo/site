import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import ThemedMixin, { theme } from '@dojo/framework/widget-core/mixins/Themed';
import I18nMixin from '@dojo/framework/widget-core/mixins/I18n';

import * as css from './SideMenu.m.css';

@theme(css)
export default class SideMenu extends ThemedMixin(I18nMixin(WidgetBase)) {
	protected render() {
		return (
			<div key="side-menu" classes={this.theme(css.root)}>
				{this.children}
			</div>
		);
	}
}
