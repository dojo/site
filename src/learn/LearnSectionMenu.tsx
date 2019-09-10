import { create, tsx } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import block from '@dojo/framework/core/middleware/block';
import Link from '../link/ActiveLink';

import getSections from './sections.block';
import * as css from './Learn.m.css';

interface LearnSectionMenuProperties {
	path: string;
	repo: string;
	branch: string;
	language?: string;
	locale?: string;
}

const factory = create({ theme, block }).properties<LearnSectionMenuProperties>();

export default factory(function LearnSectionMenu({ properties, middleware: { theme, block } }) {
	const { path, repo, branch, language, locale } = properties();
	const themedCss = theme.classes(css);
	const sections = block(getSections)({ branch, path, page: 'supplemental', repo, language, locale }) || [];
	return sections.map(({ param, title }) => {
		return (
			<li classes={themedCss.columnMenuItem}>
				<Link
					classes={css.columnMenuLink}
					key={param}
					to="learn"
					params={{ page: param }}
					activeClasses={[css.columnMenuLinkSelected]}
				>
					{title}
				</Link>
			</li>
		);
	});
});
