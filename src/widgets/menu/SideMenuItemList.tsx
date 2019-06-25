import WidgetBase from '@dojo/framework/core/WidgetBase';
import { tsx } from '@dojo/framework/core/vdom';
import ThemedMixin, { theme } from '@dojo/framework/core/mixins/Themed';
import I18nMixin from '@dojo/framework/core/mixins/I18n';

import * as css from './SideMenuItemList.m.css';

@theme(css)
export default class SideMenuItemList extends ThemedMixin(I18nMixin(WidgetBase)) {
	protected render() {
		return <ul classes={this.theme(css.root)}>{this.children}</ul>;
	}
}
