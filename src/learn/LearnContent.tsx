import { create, tsx, isVNode } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import block from '@dojo/framework/core/middleware/block';
import { decorate } from '@dojo/framework/core/util';
import { VNode } from '@dojo/framework/core/interfaces';

import getContent from './content.block';
import * as css from './Learn.m.css';

interface LearnContentProperties {
	path: string;
	page: string;
	repo: string;
	branch: string;
	url?: string;
	language: string;
	locale: string;
}

const factory = create({ theme, block }).properties<LearnContentProperties>();

export default factory(function LearnContent({ properties, middleware: { theme, block } }) {
	const { path, page, repo, branch, url, language, locale } = properties();
	const themedCss = theme.classes(css);
	const content = block(getContent)({ path, page, repo, branch, language, locale });
	url &&
		decorate(
			content,
			(node: VNode) => {
				if (/^#/.test((node.properties as any).href)) {
					(node.properties as any).href = `${url}${node.properties.href}`;
				}
			},
			(node): node is VNode => isVNode(node) && node.tag === 'a'
		);
	return <div classes={themedCss.content}>{content}</div>;
});
