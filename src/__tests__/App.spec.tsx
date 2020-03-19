import harness from '@dojo/framework/testing/harness';
import assertionTemplate from '@dojo/framework/testing/assertionTemplate';
import { tsx } from '@dojo/framework/core/vdom';
import Outlet from '@dojo/framework/routing/Outlet';
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

interface Page {
	outlet: string;
	content: DNode;
	args?: any[];
}

describe('App', () => {
	const baseAssertion = assertionTemplate(() => (
		<div classes={[css.root]}>
			<Header />
			<div classes={[css.content]}>
				<Outlet key="home" id="home" renderer={() => null} />
				<Outlet
					key="blog"
					id="blog"
					renderer={(matchDetails) => {
						if (matchDetails.isExact()) {
							return <Blog />;
						}
					}}
				/>
				<BlogPosts />
				<Outlet
					key="playground"
					id="playground"
					renderer={() => <Playground example="sandbox" type="sandbox" />}
				/>
				<Outlet
					key="playground-example"
					id="playground-example"
					renderer={({ params: { example = 'sandbox', type = 'sandbox' } }) => (
						<Playground example={example} type={type} />
					)}
				/>
				<Outlet key="roadmap" id="roadmap" renderer={() => <Roadmap />} />
				<Outlet
					key="learn"
					id="learn"
					renderer={({ params }) => <Learn guideName={params.guide} pageName={params.page} />}
				/>
			</div>
			<Footer />
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
			content: <Playground example="sandbox" type="sandbox" />
		},
		{
			outlet: 'playground-example',
			content: <Playground example="an-example" type="demo" />,
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
			content: <Learn url="url/a-guide/a-page" guideName="a-guide" pageName="a-page" />,
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
			content: <Learn url="url/a-guide/introduction" guideName="a-guide" pageName="introduction" />,
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
			content: <Learn url="url/overview/introduction" guideName="overview" pageName="introduction" />,
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
