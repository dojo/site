import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';

import * as css from './Playground.m.css';

const SANDBOX_URL =
	'https://codesandbox.io/embed/github/dojo/dojo-codesandbox-template/tree/master/?autoresize=1&hidenavigation=1';

const factory = create({ theme });

export default factory(function Playground({ middleware: { theme } }) {
	const themedCss = theme.classes(css);
	return <iframe classes={themedCss.iframe} src={SANDBOX_URL} />;
});
