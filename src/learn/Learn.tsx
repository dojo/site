import { create, tsx } from '@dojo/framework/core/vdom';
import i18n from '@dojo/framework/core/middleware/i18n';
import theme from '@dojo/framework/core/middleware/theme';
import block from '@dojo/framework/core/middleware/block';

import Menu from '../menu/Menu';
import { getLanguageFromLocale } from '../util/language';

import LearnContent from './LearnContent';
import getSections from './sections.block';

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

const factory = create({ theme, i18n, block }).properties<LearnProperties>();

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

export default factory(function Learn({ properties, middleware: { theme, i18n, block } }) {
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

	const sections = block(getSections)({ branch, path, page: 'supplemental', repo, language, locale }) || [];

	return (
		<div classes={themedCss.root}>
			<Menu
				desktopStyle="side"
				links={guides.map((guide) => {
					const { name, directory, repo = sources.framework.repo, branch = sources.framework.branch } = guide;

					const guideName = directory || name.toLowerCase().replace(' ', '-');

					return {
						label: name,
						to: 'learn',
						params: {
							guide: guideName,
							page: 'introduction',
							repo,
							branch
						},
						matchParams: { guide: guideName }
					};
				})}
				subLinks={[
					{
						label: 'Introduction',
						to: 'learn',
						params: { page: 'introduction' }
					},
					...sections.map(({ param, title }) => ({
						label: title,
						to: 'learn',
						params: { page: param }
					}))
				]}
			/>
			<main classes={themedCss.main}>
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
