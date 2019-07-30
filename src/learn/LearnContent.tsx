import { create, tsx } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import block from '@dojo/framework/core/middleware/block';

import getContent from './content.block';
import * as css from './Learn.m.css';

interface LearnContentProperties {
	path: string;
	page: string;
	repo: string;
	branch: string;
}

const factory = create({ theme, block }).properties<LearnContentProperties>();

export default factory(function LearnContent({ properties, middleware: { theme, block } }) {
	const { path, page, repo, branch } = properties();
	const themedCss = theme.classes(css);
	const content = block(getContent)({ path, page, repo, branch });
	return <div classes={themedCss.content}>{content}</div>;
});
