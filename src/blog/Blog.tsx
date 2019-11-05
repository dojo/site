import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import block from '@dojo/framework/core/middleware/block';
import i18n from '@dojo/framework/core/middleware/i18n';

import indexBlock from './index.block';
import Landing from '../landing/Landing';
import { getLanguageFromLocale } from '../util/language';

import BlogPost from './BlogPost';
import * as css from './Blog.m.css';

const factory = create({ theme, block, i18n }).properties<{ url?: string }>();

export default factory(function Blog({ properties, middleware: { theme, block, i18n } }) {
	const { url } = properties();
	const themedCss = theme.classes(css);

	let language = 'en';
	let locale = 'en';
	const localeData = i18n.get();
	if (localeData && localeData.locale) {
		language = getLanguageFromLocale(localeData.locale);
		locale = localeData.locale;
	}

	const paths = block(indexBlock)({ language, locale });

	return (
		<Landing classes={{ 'dojo.io/Landing': { root: [themedCss.root] } }}>
			{paths &&
				paths.map((path) => (
					<div key={path}>
						<BlogPost url={url} key={path} path={path} excerpt />
					</div>
				))}
		</Landing>
	);
});
