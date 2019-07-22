import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';

import SideMenuItemList from './SideMenuItemList';
import * as css from './SideMenuSection.m.css';

export interface SideMenuSectionProperties {
	title?: string;
	fixed?: boolean;
}

const factory = create({ theme }).properties<SideMenuSectionProperties>();

export default factory(function SiteMenuSection({ middleware: { theme }, properties, children }) {
	const { title, fixed = false } = properties();
	const themedCss = theme.classes(css);

	return (
		<div key="menu-section" classes={[themedCss.root, fixed ? themedCss.fixed : undefined]}>
			{title && <h5 classes={themedCss.title}>{title}</h5>}
			<SideMenuItemList classes={{ 'dojo.io/SideMenuItemList': { root: [themedCss.menuItems] } }}>
				{children()}
			</SideMenuItemList>
		</div>
	);
});
