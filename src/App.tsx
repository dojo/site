import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Outlet from '@dojo/framework/routing/Outlet';

import Header from './widgets/Header';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Examples from './pages/Examples';
import Playground from './pages/Playground';
import Community from './pages/Community';
import TutorialsLanding from './pages/TutorialsLanding';
import TutorialsPage from './pages/TutorialsPage';

import * as css from './App.m.css';

export default class App extends WidgetBase {
	protected render() {
		return (
			<div classes={[css.root]}>
				<Header />
				<div classes={[css.content]}>
					<Outlet key="home" id="home" renderer={() => <Home />} />
					<Outlet key="blog" id="blog" renderer={() => <Blog />} />
					<Outlet key="examples" id="examples" renderer={() => <Examples />} />
					<Outlet key="playground" id="playground" renderer={() => <Playground />} />
					<Outlet key="community" id="community" renderer={() => <Community />} />
					<Outlet key="tutorials" id="tutorials" renderer={(matchDetails) => <TutorialsLanding />} />
					<Outlet
						key="tutorials-page"
						id="tutorials-page"
						renderer={(matchDetails) => <TutorialsPage page={matchDetails.params.page} />}
					/>
				</div>
			</div>
		);
	}
}
