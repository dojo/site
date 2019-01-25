import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Outlet from '@dojo/framework/routing/Outlet';

import Menu from './widgets/Menu';
import Section from './widgets/section/Section';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Examples from './pages/Examples';
import Playground from './pages/Playground';
import Community from './pages/Community';

import * as css from './App.m.css';

export default class App extends WidgetBase {
	protected render() {
		return (
			<div classes={[css.root]}>
				<Menu />
				<div classes={[css.content]}>
					<Outlet key="home" id="home" renderer={() => <Home />} />
					<Outlet key="blog" id="blog" renderer={() => <Blog />} />
					<Outlet key="examples" id="examples" renderer={() => <Examples />} />
					<Outlet key="playground" id="playground" renderer={() => <Playground />} />
					<Outlet key="community" id="community" renderer={() => <Community />} />
					<Outlet
						key="tutorials"
						id="tutorials"
						renderer={(matchDetails) => {
							if (matchDetails.isExact()) {
								return <h1>Landing Page Temp for tutorials</h1>;
							}
						}}
					/>
					<Outlet
						key="tutorialsPage"
						id="tutorialsPage"
						renderer={(matchDetails) => {
							return (
								<Section
									key="section-tutorials"
									section="tutorials"
									path={`tutorials/${matchDetails.params.page}`}
								/>
							);
						}}
					/>
				</div>
			</div>
		);
	}
}
