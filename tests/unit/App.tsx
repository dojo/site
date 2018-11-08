const { describe, it } = intern.getInterface('bdd');
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Outlet from '@dojo/framework/routing/Outlet';

import Menu from '../../src/widgets/Menu';
import Home from '../../src/pages/Home';
import Blog from '../../src/pages/Blog';
import Documentation from '../../src/pages/Documentation';
import Examples from '../../src/pages/Examples';
import Playground from '../../src/pages/Playground';
import Community from '../../src/pages/Community';

import App from '../../src/App';
import * as css from '../../src/App.m.css';

describe('App', () => {
	it('renders', () => {
		const h = harness(() => <App />);
		h.expect(() => (
			<div classes={[css.root]}>
				<Menu />
				<div classes={[css.content]}>
					<Outlet key='home' id='home' renderer={() => <Home />} />
					<Outlet key='blog' id='blog' renderer={() => <Blog />} />
					<Outlet key='documentation' id='documentation' renderer={() => <Documentation />} />
					<Outlet key='examples' id='examples' renderer={() => <Examples />} />
					<Outlet key='playground' id='playground' renderer={() => <Playground />} />
					<Outlet key='community' id='community' renderer={() => <Community />} />
				</div>
			</div>
		));
	});

	const pages = [
		{ outlet: 'home', content: <Home /> },
		{ outlet: 'blog', content: <Blog /> },
		{ outlet: 'documentation', content: <Documentation />},
		{ outlet: 'examples', content: <Examples />},
		{ outlet: 'playground', content: <Playground />},
		{ outlet: 'community', content: <Community />}
	];

	it('outlets render contents', () => {
		const h = harness(() => <App />);
		pages.forEach(({ outlet, content }) => {
			const renderer = h.trigger(`@${outlet}`, 'renderer');
			h.expect(() => content, () => renderer);
		});
	});
});
