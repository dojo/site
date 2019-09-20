import { create, tsx } from '@dojo/framework/core/vdom';
import i18n from '@dojo/framework/core/middleware/i18n';
import theme from '@dojo/framework/core/middleware/theme';

import Link from '../link/ActiveLink';
import { getLanguageFromLocale } from '../util/language';

import LearnContent from './LearnContent';
import LearnSectionMenu from './LearnSectionMenu';

import * as css from './Learn.m.css';

interface LearnProperties {
	guideName: string;
	pageName: string;
	url?: string;
}

const factory = create({ theme, i18n }).properties<LearnProperties>();

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

export default factory(function Learn({ properties, middleware: { theme, i18n } }) {
	const { guideName, pageName, url } = properties();
	const themedCss = theme.classes(css);
	const path = `docs/:locale:/${guideName === 'overview' ? 'outline' : guideName.toLowerCase()}`;
	const repo = 'dojo/framework';
	const branch = 'master';

	let language = 'en';
	let locale = 'en';
	const localeData = i18n.get();
	if (localeData && localeData.locale) {
		language = getLanguageFromLocale(localeData.locale);
		locale = localeData.locale;
	}

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
						<LearnSectionMenu
							key="menu"
							repo={repo}
							path={path}
							branch={branch}
							language={language}
							locale={locale}
						/>
					</ul>
				</div>
				<LearnContent
					key="content"
					url={url}
					repo={repo}
					page={pageName}
					path={path}
					branch={branch}
					language={language}
					locale={locale}
				/>
			</main>
		</div>
	);
});
