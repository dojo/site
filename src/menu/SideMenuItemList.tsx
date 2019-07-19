import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';

import * as css from './SideMenuItemList.m.css';

const factory = create({ theme });

export default factory(function SideMenuItemList({ middleware: { theme }, children }) {
	const themedCss = theme.classes(css);
	return <ul classes={themedCss.root}>{children()}</ul>;
});
