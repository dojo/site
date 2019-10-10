import { create, tsx } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import Link from '../link/ActiveLink';

import LearnContent from './LearnContent';
import LearnSectionMenu from './LearnSectionMenu';
import * as css from './Learn.m.css';

interface LearnProperties {
	guideName: string;
	pageName: string;
	url?: string;
}

const factory = create({ theme }).properties<LearnProperties>();

export const guides = [
	'Overview',
	'Creating Widgets',
	'Middleware',
	'Building',
	'I18n',
	'Styling',
	'Stores',
	'Routing',
	'Testing'
];

export default factory(function Learn({ properties, middleware: { theme } }) {
	const { guideName, pageName, url } = properties();
	const themedCss = theme.classes(css);
	const path = `docs/:locale:/${guideName === 'overview' ? 'outline' : guideName.toLowerCase()}`;
	const repo = 'dojo/framework';
	const branch = 'v6';
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
									params={{ guide: guide.toLowerCase().replace(' ', '-'), page: 'introduction' }}
									matchParams={{ guide: guide.toLowerCase().replace(' ', '-') }}
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
						<LearnSectionMenu repo={repo} path={path} branch={branch} />
					</ul>
				</div>
				<LearnContent url={url} repo={repo} page={pageName} path={path} branch={branch} />
			</main>
		</div>
	);
});
