import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Outlet from '@dojo/framework/routing/Outlet';

import Blog from './pages/Blog';
import Community from './pages/Community';
import Examples from './pages/Examples';
import Home from './pages/Home';
import Playground from './pages/Playground';
import Menu from './widgets/Menu';
import TutorialsLanding from './pages/TutorialsLanding';
import TutorialsPage from './pages/TutorialsPage';

import App from './App';
import * as css from './App.m.css';

describe('App', () => {
	it('renders', () => {
		const h = harness(() => <App />);
		h.expect(() => (
			<div classes={[css.root]}>
				<Menu />
				<div classes={[css.content]}>
					<Outlet key="home" id="home" renderer={() => <Home />} />
					<Outlet key="blog" id="blog" renderer={() => <Blog />} />
					<Outlet key="examples" id="examples" renderer={() => <Examples />} />
					<Outlet key="playground" id="playground" renderer={() => <Playground />} />
					<Outlet key="community" id="community" renderer={() => <Community />} />
					<Outlet key="tutorials" id="tutorials" renderer={() => <TutorialsLanding />} />
					<Outlet key="tutorials-page" id="tutorials-page" renderer={() => <TutorialsPage page='some-tutorial' />} />
				</div>
			</div>
		));
	});

	const pages = [
		{ outlet: 'home', content: <Home /> },
		{ outlet: 'blog', content: <Blog /> },
		{ outlet: 'examples', content: <Examples /> },
		{ outlet: 'playground', content: <Playground /> },
		{ outlet: 'community', content: <Community /> },
		{ outlet: 'tutorials', content: <TutorialsLanding /> },
		{ outlet: 'tutorials-page', content: <TutorialsPage page='some-tutorial' /> }
	];

	it('outlets render contents', () => {
		const h = harness(() => <App />);
		pages.forEach(({ outlet, content }) => {
			const renderer = h.trigger(`@${outlet}`, 'renderer');
			h.expect(() => content, () => renderer);
		});
	});
});
