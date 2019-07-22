import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';

import * as css from './Footer.m.css';

const factory = create({ theme });

export default factory(function Footer({ middleware: { theme } }) {
	const themedCss = theme.classes(css);

	return (
		<footer classes={themedCss.root}>{`© ${new Date().getFullYear()} JS Foundation, All Rights Reserved.`}</footer>
	);
});
