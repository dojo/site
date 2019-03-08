import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import ThemedMixin, { theme } from '@dojo/framework/widget-core/mixins/Themed';
import I18nMixin from '@dojo/framework/widget-core/mixins/I18n';
import ActiveLink from '@dojo/framework/routing/ActiveLink';
import { Params } from '@dojo/framework/routing/interfaces';

import * as css from './SideMenuItem.m.css';

export interface SideMenuItemProperties {
	to: string;
	params?: Params;
}

@theme(css)
export default class SideMenuItem extends ThemedMixin(I18nMixin(WidgetBase))<SideMenuItemProperties> {
	protected render() {
		const { to, params } = this.properties;

		return (
			<li key="menu-item">
				{/^https?:\/\/[\S]+$/g.test(to) ? (
					<a href={to} target="_blank" classes={this.theme(css.root)}>
						{this.children}
					</a>
				) : (
					<ActiveLink
						to={to}
						params={params}
						classes={this.theme(css.root)}
						activeClasses={this.theme([css.selected])}
					>
						{this.children}
					</ActiveLink>
				)}
			</li>
		);
	}
}
