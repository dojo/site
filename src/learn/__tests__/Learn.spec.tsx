import assertionTemplate from '@dojo/framework/testing/harness/assertionTemplate';
import harness from '@dojo/framework/testing/harness/harness';
import { tsx } from '@dojo/framework/core/vdom';
import block from '@dojo/framework/core/middleware/block';

import Menu from '../../menu/Menu';

import createBlockMock from '../../test/mockBlock';

import { CompileRemoteBlockOptions } from '../content.block';
import getSections from '../sections.block';
import LearnContent from '../LearnContent';
import * as css from '../Learn.m.css';
import Learn from '../Learn';

describe('Learn', () => {
	const baseAssertion = assertionTemplate(() => (
		<div classes={css.root}>
			<Menu
				assertion-key="menu"
				desktopStyle="side"
				links={[
					{
						label: 'Overview',
						to: 'learn',
						params: {
							guide: 'overview',
							page: 'introduction',
							repo: 'dojo/framework',
							branch: 'master'
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
							branch: 'master'
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
							branch: 'master'
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
							branch: 'master'
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
							branch: 'master'
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
							branch: 'master'
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
							branch: 'master'
						},
						matchParams: { guide: 'stores' }
					},
					{
						label: 'Resources',
						to: 'learn',
						params: {
							guide: 'resources',
							page: 'introduction',
							repo: 'dojo/framework',
							branch: 'master'
						},
						matchParams: { guide: 'resources' }
					},
					{
						label: 'Routing',
						to: 'learn',
						params: {
							guide: 'routing',
							page: 'introduction',
							repo: 'dojo/framework',
							branch: 'master'
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
							branch: 'master'
						},
						matchParams: { guide: 'testing' }
					},
					{
						label: 'Custom Elements',
						to: 'learn',
						params: {
							guide: 'custom-elements',
							page: 'introduction',
							repo: 'dojo/framework',
							branch: 'master'
						},
						matchParams: { guide: 'custom-elements' }
					}
				]}
				subLinks={subLinks()}
			/>
			<main classes={css.main}>
				<LearnContent
					key="content"
					url="url/to/page"
					repo="dojo/framework"
					page="introduction"
					path="docs/:locale:/outline"
					branch="master"
					language="en"
					locale="en"
				/>
			</main>
		</div>
	));

	const subLinks = () => [
		{
			label: 'Introduction',
			to: 'learn',
			params: { page: 'introduction' }
		},
		{
			label: 'Title 3',
			to: 'learn',
			params: { page: 'param3' }
		},
		{
			label: 'Title 4',
			to: 'learn',
			params: { page: 'param4' }
		}
	];

	const subLinksRepoSomewhere = () => [
		{
			label: 'Introduction',
			to: 'learn',
			params: { page: 'introduction' }
		},
		{
			label: 'Title 5',
			to: 'learn',
			params: { page: 'param5' }
		},
		{
			label: 'Title 6',
			to: 'learn',
			params: { page: 'param6' }
		}
	];

	const mockBlock = createBlockMock([
		[
			getSections,
			(options: CompileRemoteBlockOptions) => {
				if (options.page === 'introduction') {
					return {
						title: 'Introduction',
						param: 'introduction'
					};
				}

				if (options.repo === 'repo/somewhere') {
					return [
						{
							title: 'Title 5',
							param: 'param5'
						},
						{
							title: 'Title 6',
							param: 'param6'
						}
					];
				}

				return [
					{
						title: 'Title 3',
						param: 'param3'
					},
					{
						title: 'Title 4',
						param: 'param4'
					}
				];
			}
		]
	]);

	it('renders overview', () => {
		const h = harness(() => <Learn guideName="overview" pageName="introduction" url="url/to/page" />, {
			middleware: [[block, mockBlock]]
		});

		h.expect(baseAssertion);
	});

	it('renders non-overview guide', () => {
		const h = harness(() => <Learn guideName="middleware" pageName="introduction" url="url/to/page" />, {
			middleware: [[block, mockBlock]]
		});

		h.expect(baseAssertion.setProperty('@content', 'path', 'docs/:locale:/middleware'));
	});

	it('renders in another language', () => {
		const h = harness(
			() => <Learn locale="zh-cn" guideName="outline" pageName="introduction" url="url/to/page" />,
			{
				middleware: [[block, mockBlock]]
			}
		);

		h.expect(baseAssertion.setProperty('@content', 'language', 'zh').setProperty('@content', 'locale', 'zh-cn'));
	});

	it('renders from a different repo and branch', () => {
		const h = harness(
			() => (
				<Learn
					guideName="outline"
					pageName="introduction"
					url="url/to/page"
					locale="zh-cn"
					repo="repo/somewhere"
					branch="branchName"
				/>
			),
			{
				middleware: [[block, mockBlock]]
			}
		);

		h.expect(
			baseAssertion
				.setProperty('@content', 'language', 'zh')
				.setProperty('@content', 'locale', 'zh-cn')
				.setProperty('@content', 'repo', 'repo/somewhere')
				.setProperty('@content', 'branch', 'branchName')
				.setProperty('~menu', 'subLinks', subLinksRepoSomewhere())
		);
	});
});
