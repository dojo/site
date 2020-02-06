import { create, tsx } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import { RenderResult } from '@dojo/framework/core/interfaces';
import Link, { LinkProperties } from '@dojo/framework/routing/Link';

import ActiveLink from '../link/ActiveLink';

import * as css from './Menu.m.css';

export interface MenuLinkProperties extends LinkProperties {
	label: RenderResult;
}

export interface MenuProperties {
	links: MenuLinkProperties[];
	desktopStyle: 'left';
}

export interface MenuDropdownProperties {
	links: MenuLinkProperties[];
	desktopStyle: 'dropdown';
	activeName: RenderResult;
}

function isDropdownStyle(properties: MenuProperties | MenuDropdownProperties): properties is MenuDropdownProperties {
	return properties.desktopStyle === 'dropdown';
}

const factory = create({ theme }).properties<MenuProperties | MenuDropdownProperties>();

export default factory(function Menu({ middleware: { theme }, properties, children }) {
	const props = properties();
	let activeName: RenderResult = '';
	if (isDropdownStyle(props)) {
		activeName = props.activeName;
	}
	const { links, desktopStyle } = props;

	const themedCss = theme.classes(css);

	const dropdownMenu = () => (
		<nav classes={themedCss.dropdownMenu}>
			<div classes={themedCss.dropdownWrapper}>
				<div classes={themedCss.dropdownContent}>
					<ul classes={themedCss.dropdownList}>
						{links.map((link) => {
							const { label, ...props } = link;
							return (
								<li classes={themedCss.dropdownListItem}>
									<Link classes={themedCss.dropdownLink} {...props}>
										{label}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
				<div classes={themedCss.dropdownParent}>
					{activeName}
					<span classes={themedCss.dropdownChevron}></span>
				</div>
			</div>
			{children()}
		</nav>
	);

	return (
		<virtual>
			{desktopStyle === 'dropdown' && dropdownMenu()}
			<nav classes={[themedCss.root, desktopStyle === 'dropdown' && themedCss.tabletOnly]}>
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
			</nav>
		</virtual>
	);
});
