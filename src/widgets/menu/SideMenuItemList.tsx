import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import ThemedMixin, { theme } from '@dojo/framework/widget-core/mixins/Themed';
import I18nMixin from '@dojo/framework/widget-core/mixins/I18n';

import * as css from './SideMenuItemList.m.css';

@theme(css)
export default class SideMenuItemList extends ThemedMixin(I18nMixin(WidgetBase)) {
	protected render() {
		return <ul classes={this.theme(css.root)}>{this.children}</ul>;
	}
}
