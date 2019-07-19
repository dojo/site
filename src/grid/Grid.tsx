import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';

import * as css from './Grid.m.css';

const factory = create({ theme });

export default factory(function Grid({ middleware: { theme }, children }) {
	const themedCss = theme.classes(css);
	return (
		<div data-test="grid" classes={themedCss.root}>
			{children()}
		</div>
	);
});
