import { create, tsx } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import block from '@dojo/framework/core/middleware/block';
import Link from '../link/ActiveLink';

import LearnContent from './LearnContent';
import getSections from './sections.block';
import * as css from './Learn.m.css';

interface LearnProperties {
	guideName: string;
	pageName: string;
}

const factory = create({ theme, block }).properties<LearnProperties>();

const guides = ['Routing', 'Building', 'I18n', 'Theming', 'Testing'];

export default factory(function Learn({ properties, middleware: { theme, block } }) {
	const { guideName, pageName } = properties();
	const themedCss = theme.classes(css);
	const path = `docs/:locale:/${guideName.toLowerCase()}`;
	const repo = 'dojo/framework';
	const sections = block(getSections)({ path, page: 'supplemental', repo }) || [];
	return (
		<div classes={themedCss.root}>
			<nav classes={themedCss.nav}>
				<ul classes={themedCss.menuList}>
					{guides.map((guide) => {
						return (
							<li classes={themedCss.menuItem}>
								<Link
									to="learn"
									classes={css.menuLink}
									params={{ guide: guide.toLowerCase(), page: 'introduction' }}
									matchParams={{ guide: guide.toLowerCase() }}
									activeClasses={[css.selected]}
								>
									{guide}
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
			<main classes={themedCss.main}>
				<div classes={themedCss.menu}>
					<ul classes={themedCss.columnMenuList}>
						<li classes={themedCss.columnMenuItem}>
							<Link
								key="intro"
								classes={css.columnMenuLink}
								to="learn"
								params={{ page: 'introduction' }}
								activeClasses={[css.columnMenuLinkSelected]}
							>
								Introduction
							</Link>
						</li>
						<li classes={themedCss.columnMenuItem}>
							<Link
								key="basic"
								classes={css.columnMenuLink}
								to="learn"
								params={{ page: 'basic-usage' }}
								activeClasses={[css.columnMenuLinkSelected]}
							>
								Basic Usage
							</Link>
						</li>
						{(sections || []).map(({ param, title }: any) => {
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
						})}
					</ul>
				</div>
				<LearnContent repo={repo} page={pageName} path={path} />
			</main>
		</div>
	);
});
