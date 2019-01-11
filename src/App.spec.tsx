import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Outlet from '@dojo/framework/routing/Outlet';

import Blog from './pages/Blog';
import Community from './pages/Community';
import Examples from './pages/Examples';
import Home from './pages/Home';
import Playground from './pages/Playground';
import Menu from './widgets/Menu';
import Page from './widgets/Page';
import Section from './widgets/section/Section';

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
					<Outlet key="tutorials" id="tutorials" renderer={() => <div />} />
					<Outlet key="tutorials-page" id="tutorials-page" renderer={() => <div />} />
				</div>
			</div>
		));
	});

	const pages = [
		{ outlet: 'home', content: <Home /> },
		{ outlet: 'blog', content: <Blog /> },
		{ outlet: 'examples', content: <Examples /> },
		{ outlet: 'playground', content: <Playground /> },
		{ outlet: 'community', content: <Community /> }
	];

	it('outlets render contents', () => {
		const h = harness(() => <App />);
		pages.forEach(({ outlet, content }) => {
			const renderer = h.trigger(`@${outlet}`, 'renderer');
			h.expect(() => content, () => renderer);
		});
	});

	it('page outlet renders contents', () => {
		const h = harness(() => <App />);

		const renderer = h.trigger(`@tutorials-page`, 'renderer', {
			isExact: true,
			params: {
				page: 'test'
			}
		});
		h.expect(() => <Section key="section-tutorials" section='tutorials' path="tutorials/test" />, () => renderer);
	});

	it('page outlet does not render on partial match', () => {
		const h = harness(() => <App />);

		const renderer = h.trigger(`@page`, 'renderer', {
			isExact: false,
			params: {
				section: 'tutorials'
			}
		});
		h.expect(() => undefined, () => renderer);
	});
});
