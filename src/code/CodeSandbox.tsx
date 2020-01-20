import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';

import * as css from './CodeSandbox.m.css';

interface CodeSandboxProperties {
	url: string;
}

const factory = create({ theme }).properties<CodeSandboxProperties>();

export default factory(function CodeSandbox({ middleware: { theme }, properties }) {
	const themedCss = theme.classes(css);
	const { url } = properties();

	return (
		<div key="root" classes={[themedCss.root]}>
			<iframe classes={[themedCss.root]} src={`${url}?autoresize=1&hidenavigation=1`} />
		</div>
	);
});
