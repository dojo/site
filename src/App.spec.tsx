import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Outlet from '@dojo/framework/routing/Outlet';
import { DNode } from '@dojo/framework/widget-core/interfaces';

import Blog from './pages/Blog';
import Community from './pages/Community';
import Examples from './pages/Examples';
import Home from './pages/Home';
import Playground from './pages/Playground';
import ReferenceGuidesLanding from './pages/ReferenceGuidesLanding';
import ReferenceGuides from './pages/reference-guides/ReferenceGuides';
import Header from './widgets/Header';
import Roadmap from './pages/Roadmap';

import App from './App';
import * as css from './App.m.css';

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
					<Outlet key="blog" id="blog" renderer={() => <Blog />} />
					<Outlet key="examples" id="examples" renderer={() => <Examples />} />
					<Outlet key="playground" id="playground" renderer={() => <Playground />} />
					<Outlet key="roadmap" id="roadmap" renderer={() => <Roadmap />} />
					<Outlet key="community" id="community" renderer={() => <Community />} />
					<Outlet key="reference-guides" id="reference-guides" renderer={() => <ReferenceGuidesLanding />} />
					<ReferenceGuides />
				</div>
			</div>
		));
	});

	const pages: Page[] = [
		{ outlet: 'home', content: <Home /> },
		{ outlet: 'blog', content: <Blog /> },
		{ outlet: 'examples', content: <Examples /> },
		{ outlet: 'playground', content: <Playground /> },
		{ outlet: 'roadmap', content: <Roadmap /> },
		{ outlet: 'community', content: <Community /> },
		{ outlet: 'reference-guides', content: <ReferenceGuidesLanding /> }
	];

	it('outlets render contents', () => {
		const h = harness(() => <App />);
		pages.forEach(({ outlet, content, args = [] }) => {
			const renderer = h.trigger(`@${outlet}`, 'renderer', ...args);
			h.expect(() => content, () => renderer);
		});
	});
});
