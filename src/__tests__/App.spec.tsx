import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';
import Outlet from '@dojo/framework/routing/Outlet';
import { DNode } from '@dojo/framework/core/interfaces';

import Blog from '../blog/Blog';
import BlogPosts from '../blog/BlogPosts';
import Examples from '../examples/Examples';
import Home from '../home/Home';
import Playground from '../playground/Playground';
import Header from '../header/Header';
import Roadmap from '../roadmap/Roadmap';

import App from '../App';
import * as css from '../App.m.css';
import Footer from '../footer/Footer';
import Learn from '../learn/Learn';

interface Page {
	outlet: string;
	content: DNode;
	args?: any[];
}

describe('App', () => {
	it('renders', () => {
		const h = harness(() => <App />);
		h.expect(() => (
			<div classes={[css.root]}>
				<Header />
				<div classes={[css.content]}>
					<Outlet key="home" id="home" renderer={() => <Home />} />
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
					<Outlet key="examples" id="examples" renderer={() => <Examples />} />
					<Outlet key="playground" id="playground" renderer={() => <Playground />} />
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
	});

	const pages: Page[] = [
		{ outlet: 'home', content: <Home /> },
		{ outlet: 'blog', content: <Blog />, args: [{ isExact: () => true }] },
		{ outlet: 'blog', content: undefined, args: [{ isExact: () => false }] },
		{ outlet: 'examples', content: <Examples /> },
		{ outlet: 'playground', content: <Playground /> },
		{ outlet: 'roadmap', content: <Roadmap /> }
	];

	it('outlets render contents', () => {
		const h = harness(() => <App />);
		pages.forEach(({ outlet, content, args = [] }) => {
			const renderer = h.trigger(`@${outlet}`, 'renderer', ...args);
			h.expect(() => content, () => renderer);
		});
	});
});
