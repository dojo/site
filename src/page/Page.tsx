import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import * as css from './Page.m.css';

const factory = create({ theme });

export default factory(function Page({ middleware: { theme }, children }) {
	const themedCss = theme.classes(css);

	return (
		<div classes={themedCss.root}>
			<div classes={themedCss.content}>{children()}</div>
		</div>
	);
});
