import { create, tsx } from '@dojo/framework/core/vdom';
import i18n from '@dojo/framework/core/middleware/i18n';
import theme from '@dojo/framework/core/middleware/theme';
import block from '@dojo/framework/core/middleware/block';

import { GUIDES, GUIDES_DEFAULT_REPO } from '../constants';
import Menu from '../menu/Menu';
import { getLanguageFromLocale } from '../util/language';

import LearnContent from './LearnContent';
import getSections from './sections.block';

import * as css from './Learn.m.css';

interface LearnProperties {
	guidesBranch: string;
	guideName: string;
	pageName: string;
	url?: string;
	repo?: string;
	branch?: string;
}

const factory = create({ theme, i18n, block }).properties<LearnProperties>();

export default factory(function Learn({ properties, middleware: { theme, i18n, block } }) {
	const {
		guidesBranch,
		guideName,
		pageName,
		url,
		repo = GUIDES_DEFAULT_REPO,
		branch = guidesBranch,
		locale = 'en'
	} = properties();
	const themedCss = theme.classes(css);
	const path = `docs/:locale:/${guideName === 'overview' ? 'outline' : guideName.toLowerCase()}`;

	const language = locale ? getLanguageFromLocale(locale) : locale;
	const introductionSections =
		block(getSections)({ branch, path, page: 'introduction', repo, language, locale }) || [];
	const supplementalSections =
		block(getSections)({ branch, path, page: 'supplemental', repo, language, locale }) || [];
	const sections = [...introductionSections, ...supplementalSections];

	return (
		<div classes={themedCss.root}>
			<Menu
				desktopStyle="side"
				links={GUIDES.map((guide) => {
					const { name, directory, repo = GUIDES_DEFAULT_REPO, branch = guidesBranch } = guide;

					const guideName = directory || name.toLowerCase().replace(' ', '-');

					return {
						key: name,
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
					...sections.map(({ param, title }) => ({
						key: `${guideName}-${title}`,
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
