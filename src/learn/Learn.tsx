import { create, tsx } from '@dojo/framework/core/vdom';
import i18n from '@dojo/framework/core/middleware/i18n';
import theme from '@dojo/framework/core/middleware/theme';

import Link from '../link/ActiveLink';
import { getLanguageFromLocale } from '../util/language';

import LearnContent from './LearnContent';
import LearnSectionMenu from './LearnSectionMenu';

import * as css from './Learn.m.css';

interface Guide {
	name: string;
	directory?: string;
	repo?: string;
	branch?: string;
}

interface LearnProperties {
	guideName: string;
	pageName: string;
	url?: string;
	repo?: string;
	branch?: string;
}

const factory = create({ theme, i18n }).properties<LearnProperties>();

export const sources = {
	framework: {
		repo: 'dojo/framework',
		branch: 'v6'
	}
};

export const guides: Guide[] = [
	{ name: 'Overview' },
	{ name: 'Creating Widgets' },
	{ name: 'Middleware' },
	{ name: 'Building' },
	{ name: 'I18n' },
	{ name: 'Styling' },
	{ name: 'Stores' },
	{ name: 'Routing' },
	{ name: 'Testing' }
];

export default factory(function Learn({ properties, middleware: { theme, i18n } }) {
	const { guideName, pageName, url, repo = sources.framework.repo, branch = sources.framework.branch } = properties();
	const themedCss = theme.classes(css);
	const path = `docs/:locale:/${guideName === 'overview' ? 'outline' : guideName.toLowerCase()}`;

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
						const {
							name,
							directory,
							repo = sources.framework.repo,
							branch = sources.framework.branch
						} = guide;

						return (
							<li classes={themedCss.menuItem}>
								<Link
									to="learn"
									classes={css.menuLink}
									params={{
										guide: directory || name.toLowerCase().replace(' ', '-'),
										page: 'introduction',
										repo,
										branch
									}}
									matchParams={{ guide: directory || name.toLowerCase().replace(' ', '-') }}
									activeClasses={[css.selected]}
								>
									{name}
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
