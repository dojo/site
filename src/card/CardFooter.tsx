import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';

import * as css from './CardFooter.m.css';

const factory = create({ theme });

export default factory(function CardFooter({ middleware: { theme }, children }) {
	const themedCss = theme.classes(css);

	return (
		<footer key="card-footer" data-test="footer" classes={themedCss.root}>
			{children()}
		</footer>
	);
});
