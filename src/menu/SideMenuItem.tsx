import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import icache from '@dojo/framework/core/middleware/icache';
import ActiveLink from '@dojo/framework/routing/ActiveLink';
import { Params } from '@dojo/framework/routing/interfaces';

import FontAwesomeIcon from '../icon/FontAwesomeIcon';

import * as css from './SideMenuItem.m.css';

export interface SideMenuItemProperties {
	name?: string;
	to?: string;
	params?: Params;
	inverse?: boolean;
}

const factory = create({ theme, icache }).properties<SideMenuItemProperties>();

export default factory(function SideMenuItem({ middleware: { theme, icache }, children, properties }) {
	const { to, params, inverse = false, name = '' } = properties();
	const themedCss = theme.classes(css);

	let linkClasses: string[] = [themedCss.link];
	if (inverse) {
		linkClasses.push(themedCss.inverse);
	}
	if (!to) {
		const url = window.location.pathname;
		linkClasses.push(themedCss.dropdownLink);
		if (name !== '' && url.includes(name)) {
			linkClasses.push(themedCss.selected);
		}
	}

	const dropDownOpen = icache.get<boolean>('dropDownOpen') || false;

	return (
		<li key="menu-item" classes={themedCss.root}>
			{to ? (
				/^https?:\/\/[\S]+$/g.test(to) ? (
					<a key="link" href={to} target="_blank" classes={themedCss.link}>
						{children()}
					</a>
				) : (
					<ActiveLink
						key="link"
						to={to}
						params={params}
						classes={linkClasses}
						activeClasses={[themedCss.selected]}
					>
						{children()}
					</ActiveLink>
				)
			) : (
				[
					<button key="link" classes={linkClasses} onclick={() => icache.set('dropDownOpen', !dropDownOpen)}>
						{name}
						<FontAwesomeIcon
							key="toggleIcon"
							icon={dropDownOpen ? 'chevron-down' : 'chevron-right'}
							classes={{ 'dojo.io/FontAwesomeIcon': { root: [themedCss.dropdownIcon] } }}
						/>
					</button>,
					<div classes={[themedCss.children, dropDownOpen ? themedCss.expanded : themedCss.collapsed]}>
						{children()}
					</div>
				]
			)}
		</li>
	);
});
