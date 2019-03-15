import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import ThemedMixin, { theme, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import ActiveLink from '@dojo/framework/routing/ActiveLink';
import { Params } from '@dojo/framework/routing/interfaces';

import FontAwesomeIcon from '../icon/FontAwesomeIcon';

import * as css from './SideMenuItem.m.css';

export interface SideMenuItemProperties extends ThemedProperties {
	name?: string;
	to?: string;
	params?: Params;
	inverse?: boolean;
}

@theme(css)
export default class SideMenuItem extends ThemedMixin(WidgetBase)<SideMenuItemProperties> {
	private _dropDownOpen = false;
	private _toggleDropDown() {
		this._dropDownOpen = !this._dropDownOpen;
		this.invalidate();
	}

	private _renderDropDownLink() {
		const { name = '', inverse = false } = this.properties;

		const url = window.location.pathname;
		let activeClass: string | undefined = undefined;
		if (name !== '' && new RegExp(name.toLowerCase().replace(' ', '-'), 'g').test(url)) {
			activeClass = inverse ? css.selectedInverse : css.selected;
		}

		return [
			<a
				key="link"
				classes={this.theme([css.link, css.dropdownLink, activeClass])}
				onclick={() => this._toggleDropDown()}
			>
				{name}
				<FontAwesomeIcon
					key="toggleIcon"
					icon={this._dropDownOpen ? 'chevron-down' : 'chevron-right'}
					classes={{ 'dojo.io/FontAwesomeIcon': { root: this.theme([css.dropdownIcon]) } }}
				/>
			</a>,
			this._dropDownOpen && this.children
		];
	}

	protected render() {
		const { to, params, inverse = false } = this.properties;

		return (
			<li key="menu-item" classes={this.theme(css.root)}>
				{to ? (
					/^https?:\/\/[\S]+$/g.test(to) ? (
						<a key="link" href={to} target="_blank" classes={this.theme(css.link)}>
							{this.children}
						</a>
					) : (
						<ActiveLink
							key="link"
							to={to}
							params={params}
							classes={this.theme(css.link)}
							activeClasses={this.theme([inverse ? css.selectedInverse : css.selected])}
						>
							{this.children}
						</ActiveLink>
					)
				) : (
					this._renderDropDownLink()
				)}
			</li>
		);
	}
}
