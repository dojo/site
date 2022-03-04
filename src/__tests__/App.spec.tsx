import harness from '@dojo/framework/testing/harness/harness';
import assertionTemplate from '@dojo/framework/testing/harness/assertionTemplate';
import { tsx } from '@dojo/framework/core/vdom';
import Route from '@dojo/framework/routing/Route';
import { DNode } from '@dojo/framework/core/interfaces';
import i18n from '@dojo/framework/core/middleware/i18n';

import Blog from '../blog/Blog';
import BlogPosts from '../blog/BlogPosts';
import Home from '../home/Home';
import Playground from '../playground/Playground';
import Header from '../header/Header';
import Roadmap from '../roadmap/Roadmap';
import Footer from '../footer/Footer';
import Learn from '../learn/Learn';

import createI18nMock from '../test/mockI18n';

import * as css from '../App.m.css';
import App from '../App';
import {
	EXAMPLES_BRANCH,
	GUIDES_DEFAULT_BRANCH,
	IS_LATEST,
	OTHER_VERSIONS,
	VERSION_BRANCH,
	WIDGETS_DEFAULT_BRANCH
} from '../constants';

interface Page {
	outlet: string;
	content: DNode;
	args?: any[];
}

describe('App', () => {
	const baseAssertion = assertionTemplate(() => (
		<div classes={[css.root]}>
			<Header widgetsBranch={WIDGETS_DEFAULT_BRANCH} isLatest={IS_LATEST} />
			<div classes={[css.content]}>
				<Route key="home" id="home" renderer={() => null} />
				<Route
					key="blog"
					id="blog"
					renderer={(matchDetails) => {
						if (matchDetails.isExact()) {
							return <Blog />;
						}
					}}
				/>
				<BlogPosts />
				<Route
					key="playground"
					id="playground"
					renderer={() => (
						<Playground
							examplesBranch={EXAMPLES_BRANCH}
							isLatest={IS_LATEST}
							example="sandbox"
							type="sandbox"
							branch="v8"
						/>
					)}
				/>
				<Route
					key="playground-example"
					id="playground-example"
					renderer={({ params: { example = 'sandbox', type = 'sandbox' } }) => (
						<Playground
							examplesBranch={EXAMPLES_BRANCH}
							isLatest={IS_LATEST}
							example={example}
							type={type}
							branch="v8"
						/>
					)}
				/>
				<Route key="roadmap" id="roadmap" renderer={() => <Roadmap />} />
				<Route
					key="learn"
					id="learn"
					renderer={({ params }) => (
						<Learn guidesBranch={GUIDES_DEFAULT_BRANCH} guideName={params.guide} pageName={params.page} />
					)}
				/>
			</div>
			<Footer branch={VERSION_BRANCH} isLatest={IS_LATEST} otherVersions={OTHER_VERSIONS} />
		</div>
	));

	it('renders', () => {
		const mockI18nSet = jest.fn();
		const mockI18n = createI18nMock(undefined, mockI18nSet);
		const h = harness(() => <App />, { middleware: [[i18n, mockI18n]] });
		h.expect(baseAssertion);
	});

	it('renders in another language', () => {
		const mockI18nSet = jest.fn();
		const mockI18n = createI18nMock('zh-cn', mockI18nSet);
		const h = harness(() => <App />, { middleware: [[i18n, mockI18n]] });
		h.expect(baseAssertion);
	});

	const pages: Page[] = [
		{ outlet: 'home', content: <Home /> },
		{
			outlet: 'blog',
			content: <Blog url={undefined} />,
			args: [{ router: { link: () => {} }, isExact: () => true }]
		},
		{ outlet: 'blog', content: undefined, args: [{ router: { link: () => {} }, isExact: () => false }] },
		{
			outlet: 'playground',
			content: (
				<Playground
					examplesBranch={EXAMPLES_BRANCH}
					isLatest={IS_LATEST}
					example="sandbox"
					type="sandbox"
					branch={VERSION_BRANCH}
				/>
			)
		},
		{
			outlet: 'playground-example',
			content: (
				<Playground
					examplesBranch={EXAMPLES_BRANCH}
					isLatest={IS_LATEST}
					example="an-example"
					type="demo"
					branch={VERSION_BRANCH}
				/>
			),
			args: [
				{
					params: {
						example: 'an-example',
						type: 'demo'
					}
				}
			]
		},
		{ outlet: 'roadmap', content: <Roadmap /> },
		{ outlet: 'roadmap', content: <Roadmap /> },
		{
			outlet: 'learn',
			content: (
				<Learn
					guidesBranch={GUIDES_DEFAULT_BRANCH}
					url="url/a-guide/a-page"
					guideName="a-guide"
					pageName="a-page"
				/>
			),
			args: [
				{
					params: {
						guide: 'a-guide',
						page: 'a-page'
					},
					router: {
						link: () => 'url/a-guide/a-page'
					}
				}
			]
		},
		{
			outlet: 'learn',
			content: (
				<Learn
					guidesBranch={GUIDES_DEFAULT_BRANCH}
					url="url/a-guide/introduction"
					guideName="a-guide"
					pageName="introduction"
				/>
			),
			args: [
				{
					params: {
						guide: 'a-guide'
					},
					router: {
						link: () => 'url/a-guide/introduction'
					}
				}
			]
		},
		{
			outlet: 'learn',
			content: (
				<Learn
					guidesBranch={GUIDES_DEFAULT_BRANCH}
					url="url/overview/introduction"
					guideName="overview"
					pageName="introduction"
				/>
			),
			args: [
				{
					params: {},
					router: {
						link: () => 'url/overview/introduction'
					}
				}
			]
		}
	];

	it('outlets render contents', () => {
		const h = harness(() => <App />);
		pages.forEach(({ outlet, content, args = [] }) => {
			const renderer = h.trigger(`@${outlet}`, 'renderer', ...args);
			h.expect(
				() => content,
				() => renderer
			);
		});
	});
});
