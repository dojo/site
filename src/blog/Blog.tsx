import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import block from '@dojo/framework/core/middleware/block';

import indexBlock from './index.block';
import Landing from '../landing/Landing';

import BlogPost from './BlogPost';
import * as css from './Blog.m.css';

const factory = create({ theme, block });

export default factory(function Blog({ middleware: { theme, block } }) {
	const themedCss = theme.classes(css);

	const paths = block(indexBlock)({ locale: 'en' });

	return (
		<Landing classes={{ 'dojo.io/Landing': { root: [themedCss.root] } }}>
			{paths && paths.map((path: string) => <BlogPost path={path} excerpt />)}
		</Landing>
	);
});
