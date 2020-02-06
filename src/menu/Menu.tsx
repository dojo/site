import { create, tsx } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import { RenderResult } from '@dojo/framework/core/interfaces';
import { LinkProperties } from '@dojo/framework/routing/Link';

import Link from '../link/ActiveLink';

import * as css from './Menu.m.css';

export interface MenuLinkProperties extends LinkProperties {
	label: RenderResult;
}

export interface MenuProperties {
	links: MenuLinkProperties[];
}

const factory = create({ theme }).properties<MenuProperties>();

export default factory(function Menu({ middleware: { theme }, properties }) {
	const { links } = properties();
	const themedCss = theme.classes(css);
	return (
		<nav classes={themedCss.root}>
			<ul classes={themedCss.menuList}>
				{links.map((link) => {
					const { label, ...props } = link;
					return (
						<li classes={themedCss.menuItem}>
							<Link classes={css.menuLink} activeClasses={[css.selected]} {...props}>
								{label}
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
});
