import { create, tsx } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import { RenderResult } from '@dojo/framework/core/interfaces';
import { LinkProperties } from '@dojo/framework/routing/Link';

import ActiveLink from '../link/ActiveLink';
import Dropdown from '../dropdown/Dropdown';

import * as css from './Menu.m.css';

export interface MenuLinkProperties extends LinkProperties {
	label: RenderResult;
}

export interface MenuProperties {
	links: MenuLinkProperties[];
	type?: 'main' | 'sub';
}

export interface MenuLeftProperties extends MenuProperties {
	desktopStyle: 'side';
	subLinks?: MenuLinkProperties[];
}

export interface MenuDropdownProperties extends MenuProperties {
	desktopStyle: 'dropdown';
	activeName: RenderResult;
}

export interface SubMenuDropdownProperties {
	links: MenuLinkProperties[];
	desktopStyle: 'dropdown';
	activeName: RenderResult;
	subLinks: MenuLinkProperties[];
	subActiveName: RenderResult;
}

function isDropdownStyle(
	properties: MenuLeftProperties | MenuDropdownProperties | SubMenuDropdownProperties
): properties is MenuDropdownProperties {
	return properties.desktopStyle === 'dropdown' && !properties.hasOwnProperty('subLinks');
}

function isSubDropdownStyle(
	properties: MenuLeftProperties | MenuDropdownProperties | SubMenuDropdownProperties
): properties is SubMenuDropdownProperties {
	return properties.desktopStyle === 'dropdown' && properties.hasOwnProperty('subLinks');
}

const factory = create({ theme }).properties<MenuLeftProperties | MenuDropdownProperties | SubMenuDropdownProperties>();

export default factory(function Menu({ middleware: { theme }, properties, children }) {
	const props = properties();

	let activeName: RenderResult = '';
	let subActiveName: RenderResult = '';
	let subLinks: MenuLinkProperties[] | undefined = undefined;

	if (isDropdownStyle(props)) {
		activeName = props.activeName;
	} else if (isSubDropdownStyle(props)) {
		activeName = props.activeName;
		subActiveName = props.subActiveName;
		subLinks = props.subLinks;
	} else {
		subLinks = props.subLinks;
	}

	const { links, desktopStyle } = props;

	const themedCss = theme.classes(css);

	const menu = (
		type: 'main' | 'sub',
		links: MenuLinkProperties[],
		activeName: RenderResult,
		showChildren: boolean
	) => (
		<nav classes={[themedCss.menu, themedCss[type]]}>
			{desktopStyle === 'dropdown' && <Dropdown activeName={activeName} items={links} />}
			<ul classes={themedCss.menuList}>
				{links.map((link) => {
					const { label, ...props } = link;
					return (
						<li classes={themedCss.menuItem}>
							<ActiveLink classes={css.menuLink} activeClasses={[css.selected]} {...props}>
								{label}
							</ActiveLink>
						</li>
					);
				})}
			</ul>
			{showChildren && children()}
		</nav>
	);

	return (
		<div classes={themedCss[desktopStyle]}>
			{menu('main', links, activeName, !Boolean(subLinks))}
			{subLinks && menu('sub', subLinks, subActiveName, true)}
		</div>
	);
});
