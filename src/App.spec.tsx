import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';
import Outlet from '@dojo/framework/routing/Outlet';
import { DNode } from '@dojo/framework/core/interfaces';

import { content } from './constants';
import Footer from './widgets/footer/Footer';
import Header from './widgets/header/Header';

import Roadmap from './pages/Roadmap';
import Blog from './pages/Blog';
import BlogPosts from './pages/blog/BlogPosts';
import Community from './pages/Community';
import Examples from './pages/Examples';
import Home from './pages/Home';
import Playground from './pages/Playground';
import ReferenceGuidesLanding from './pages/ReferenceGuidesLanding';
import ReferenceGuides from './pages/reference-guides/ReferenceGuides';

import App from './App';
import * as css from './App.m.css';

interface Page {
	outlet: string;
	content: DNode;
	args?: any[];
}

describe('App', () => {
	const { referenceGuides } = content;

	it('renders', () => {
		const h = harness(() => <App />);
		h.expect(() => (
			<div classes={[css.root]}>
				<Header referenceGuides={referenceGuides} />
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
					<Outlet key="community" id="community" renderer={() => <Community />} />
					<Outlet
						key="reference-guides"
						id="reference-guides"
						renderer={() => <ReferenceGuidesLanding referenceGuides={referenceGuides} />}
					/>
					<ReferenceGuides referenceGuides={referenceGuides} />
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
		{ outlet: 'roadmap', content: <Roadmap /> },
		{ outlet: 'community', content: <Community /> },
		{ outlet: 'reference-guides', content: <ReferenceGuidesLanding referenceGuides={referenceGuides} /> }
	];

	it('outlets render contents', () => {
		const h = harness(() => <App />);
		pages.forEach(({ outlet, content, args = [] }) => {
			const renderer = h.trigger(`@${outlet}`, 'renderer', ...args);
			h.expect(() => content, () => renderer);
		});
	});
});
