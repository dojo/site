import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';

import * as css from './Landing.m.css';

const factory = create({ theme });

export default factory(function Landing({ middleware: { theme }, children }) {
	const themedCss = theme.classes(css);
	return <div classes={themedCss.root}>{children()}</div>;
});
