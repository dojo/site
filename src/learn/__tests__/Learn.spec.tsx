import assertionTemplate from '@dojo/framework/testing/harness/assertionTemplate';
import harness from '@dojo/framework/testing/harness/harness';
import { tsx } from '@dojo/framework/core/vdom';
import block from '@dojo/framework/core/middleware/block';

import Menu, { MenuLinkProperties } from '../../menu/Menu';

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
						key: 'Overview',
						label: 'Overview',
						to: 'learn',
						params: {
							guide: 'overview',
							page: 'introduction',
							repo: 'dojo/framework',
							branch: 'v8'
						},
						matchParams: { guide: 'overview' }
					},
					{
						key: 'Creating Widgets',
						label: 'Creating Widgets',
						to: 'learn',
						params: {
							guide: 'creating-widgets',
							page: 'introduction',
							repo: 'dojo/framework',
							branch: 'v8'
						},
						matchParams: { guide: 'creating-widgets' }
					},
					{
						key: 'Middleware',
						label: 'Middleware',
						to: 'learn',
						params: {
							guide: 'middleware',
							page: 'introduction',
							repo: 'dojo/framework',
							branch: 'v8'
						},
						matchParams: { guide: 'middleware' }
					},
					{
						key: 'Building',
						label: 'Building',
						to: 'learn',
						params: {
							guide: 'building',
							page: 'introduction',
							repo: 'dojo/framework',
							branch: 'v8'
						},
						matchParams: { guide: 'building' }
					},
					{
						key: 'I18n',
						label: 'I18n',
						to: 'learn',
						params: {
							guide: 'i18n',
							page: 'introduction',
							repo: 'dojo/framework',
							branch: 'v8'
						},
						matchParams: { guide: 'i18n' }
					},
					{
						key: 'Styling',
						label: 'Styling',
						to: 'learn',
						params: {
							guide: 'styling',
							page: 'introduction',
							repo: 'dojo/framework',
							branch: 'v8'
						},
						matchParams: { guide: 'styling' }
					},
					{
						key: 'Stores',
						label: 'Stores',
						to: 'learn',
						params: {
							guide: 'stores',
							page: 'introduction',
							repo: 'dojo/framework',
							branch: 'v8'
						},
						matchParams: { guide: 'stores' }
					},
					{
						key: 'Resources',
						label: 'Resources',
						to: 'learn',
						params: {
							guide: 'resources',
							page: 'introduction',
							repo: 'dojo/framework',
							branch: 'v8'
						},
						matchParams: { guide: 'resources' }
					},
					{
						key: 'Routing',
						label: 'Routing',
						to: 'learn',
						params: {
							guide: 'routing',
							page: 'introduction',
							repo: 'dojo/framework',
							branch: 'v8'
						},
						matchParams: { guide: 'routing' }
					},
					{
						key: 'Testing',
						label: 'Testing',
						to: 'learn',
						params: {
							guide: 'testing',
							page: 'introduction',
							repo: 'dojo/framework',
							branch: 'v8'
						},
						matchParams: { guide: 'testing' }
					},
					{
						key: 'Custom Elements',
						label: 'Custom Elements',
						to: 'learn',
						params: {
							guide: 'custom-elements',
							page: 'introduction',
							repo: 'dojo/framework',
							branch: 'v8'
						},
						matchParams: { guide: 'custom-elements' }
					}
				]}
				subLinks={subLinks('overview')}
			/>
			<main classes={css.main}>
				<LearnContent
					key="content"
					url="url/to/page"
					repo="dojo/framework"
					page="introduction"
					path="docs/:locale:/outline"
					branch="v8"
					language="en"
					locale="en"
				/>
			</main>
		</div>
	));

	const subLinks: (guideName: string) => MenuLinkProperties[] = (guideName) => [
		{
			key: `${guideName}-Introduction`,
			label: 'Introduction',
			to: 'learn',
			params: { page: 'introduction' }
		},
		{
			key: `${guideName}-Title 3`,
			label: 'Title 3',
			to: 'learn',
			params: { page: 'param3' }
		},
		{
			key: `${guideName}-Title 4`,
			label: 'Title 4',
			to: 'learn',
			params: { page: 'param4' }
		}
	];

	const subLinksRepoSomewhere: () => MenuLinkProperties[] = () => [
		{
			key: 'outline-Introduction',
			label: 'Introduction',
			to: 'learn',
			params: { page: 'introduction' }
		},
		{
			key: 'outline-Title 5',
			label: 'Title 5',
			to: 'learn',
			params: { page: 'param5' }
		},
		{
			key: 'outline-Title 6',
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
		const h = harness(
			() => <Learn guidesBranch="v8" guideName="overview" pageName="introduction" url="url/to/page" />,
			{
				middleware: [[block, mockBlock]]
			}
		);

		h.expect(baseAssertion);
	});

	it('renders non-overview guide', () => {
		const h = harness(
			() => <Learn guidesBranch="v8" guideName="middleware" pageName="introduction" url="url/to/page" />,
			{
				middleware: [[block, mockBlock]]
			}
		);

		h.expect(
			baseAssertion
				.setProperty('@content', 'path', 'docs/:locale:/middleware')
				.setProperty('~menu', 'subLinks', subLinks('middleware'))
		);
	});

	it('renders in another language', () => {
		const h = harness(
			() => (
				<Learn guidesBranch="v8" locale="zh-cn" guideName="outline" pageName="introduction" url="url/to/page" />
			),
			{
				middleware: [[block, mockBlock]]
			}
		);

		h.expect(
			baseAssertion
				.setProperty('@content', 'language', 'zh')
				.setProperty('@content', 'locale', 'zh-cn')
				.setProperty('~menu', 'subLinks', subLinks('outline'))
		);
	});

	it('renders from a different repo and branch', () => {
		const h = harness(
			() => (
				<Learn
					guidesBranch="v8"
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
