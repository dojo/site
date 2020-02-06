import assertionTemplate from '@dojo/framework/testing/assertionTemplate';
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';
import Link from '@dojo/framework/routing/ActiveLink';
import i18n from '@dojo/framework/core/middleware/i18n';

import Menu from '../../menu/Menu';

import createI18nMock from '../../test/mockI18n';

import LearnContent from '../LearnContent';
import LearnSectionMenu from '../LearnSectionMenu';
import * as css from '../Learn.m.css';
import Learn from '../Learn';

describe('Learn', () => {
	const baseAssertion = assertionTemplate(() => (
		<div classes={css.root}>
			<Menu
				desktopStyle="left"
				links={[
					{
						label: 'Overview',
						to: 'learn',
						params: {
							guide: 'overview',
							page: 'introduction',
							repo: 'dojo/framework',
							branch: 'v6'
						},
						matchParams: { guide: 'overview' }
					},
					{
						label: 'Creating Widgets',
						to: 'learn',
						params: {
							guide: 'creating-widgets',
							page: 'introduction',
							repo: 'dojo/framework',
							branch: 'v6'
						},
						matchParams: { guide: 'creating-widgets' }
					},
					{
						label: 'Middleware',
						to: 'learn',
						params: {
							guide: 'middleware',
							page: 'introduction',
							repo: 'dojo/framework',
							branch: 'v6'
						},
						matchParams: { guide: 'middleware' }
					},
					{
						label: 'Building',
						to: 'learn',
						params: {
							guide: 'building',
							page: 'introduction',
							repo: 'dojo/framework',
							branch: 'v6'
						},
						matchParams: { guide: 'building' }
					},
					{
						label: 'I18n',
						to: 'learn',
						params: {
							guide: 'i18n',
							page: 'introduction',
							repo: 'dojo/framework',
							branch: 'v6'
						},
						matchParams: { guide: 'i18n' }
					},
					{
						label: 'Styling',
						to: 'learn',
						params: {
							guide: 'styling',
							page: 'introduction',
							repo: 'dojo/framework',
							branch: 'v6'
						},
						matchParams: { guide: 'styling' }
					},
					{
						label: 'Stores',
						to: 'learn',
						params: {
							guide: 'stores',
							page: 'introduction',
							repo: 'dojo/framework',
							branch: 'v6'
						},
						matchParams: { guide: 'stores' }
					},
					{
						label: 'Routing',
						to: 'learn',
						params: {
							guide: 'routing',
							page: 'introduction',
							repo: 'dojo/framework',
							branch: 'v6'
						},
						matchParams: { guide: 'routing' }
					},
					{
						label: 'Testing',
						to: 'learn',
						params: {
							guide: 'testing',
							page: 'introduction',
							repo: 'dojo/framework',
							branch: 'v6'
						},
						matchParams: { guide: 'testing' }
					}
				]}
			/>
			<main classes={css.main}>
				<div classes={css.menu}>
					<ul classes={css.columnMenuList}>
						<li classes={css.columnMenuItem}>
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
							repo="dojo/framework"
							path="docs/:locale:/outline"
							branch="v6"
							language="en"
							locale="en"
						/>
					</ul>
				</div>
				<LearnContent
					key="content"
					url="url/to/page"
					repo="dojo/framework"
					page="introduction"
					path="docs/:locale:/outline"
					branch="v6"
					language="en"
					locale="en"
				/>
			</main>
		</div>
	));

	it('renders overview', () => {
		const h = harness(() => <Learn guideName="overview" pageName="introduction" url="url/to/page" />);

		h.expect(baseAssertion);
	});

	it('renders non-overview guide', () => {
		const h = harness(() => <Learn guideName="middleware" pageName="introduction" url="url/to/page" />);

		h.expect(
			baseAssertion
				.setProperty('@menu', 'path', 'docs/:locale:/middleware')
				.setProperty('@content', 'path', 'docs/:locale:/middleware')
		);
	});

	it('renders in another language', () => {
		const mockI18n = createI18nMock('zh-cn');

		const h = harness(() => <Learn guideName="outline" pageName="introduction" url="url/to/page" />, {
			middleware: [[i18n, mockI18n]]
		});

		h.expect(
			baseAssertion
				.setProperty('@menu', 'language', 'zh')
				.setProperty('@menu', 'locale', 'zh-cn')
				.setProperty('@content', 'language', 'zh')
				.setProperty('@content', 'locale', 'zh-cn')
		);
	});
});
