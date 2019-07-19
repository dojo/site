import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import cache from '@dojo/framework/core/middleware/cache';
import intersection from '@dojo/framework/core/middleware/intersection';
import has, { exists } from '@dojo/framework/core/has';

import * as css from './CodeSandbox.m.css';

interface CodeSandboxProperties {
	url: string;
}

const factory = create({ theme, cache, intersection }).properties<CodeSandboxProperties>();

export default factory(function CodeSandbox({ middleware: { theme, cache, intersection }, properties }) {
	const themedCss = theme.classes(css);

	const { url } = properties();
	if (exists('build-time-render') && !has('build-time-render')) {
		const { isIntersecting } = intersection.get('root');
		if (isIntersecting) {
			cache.set('src', `${url}?autoresize=1&hidenavigation=1`);
		}

		const src = cache.get<string>('src') || '';
		return (
			<div key="root" classes={[themedCss.root]}>
				<iframe classes={[themedCss.root]} src={src} />
			</div>
		);
	}
});
