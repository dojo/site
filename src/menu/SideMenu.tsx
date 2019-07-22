import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';

import * as css from './SideMenu.m.css';

const factory = create({ theme });

export default factory(function SideMenu({ middleware: { theme }, children }) {
	const themedCss = theme.classes(css);
	return (
		<div key="side-menu" classes={themedCss.root}>
			{children()}
		</div>
	);
});
