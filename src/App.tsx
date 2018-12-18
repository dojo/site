import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Outlet from '@dojo/framework/routing/Outlet';

import Menu from './widgets/Menu';
import Page from './widgets/Page';
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
						key="page"
						id="page"
						renderer={(matchDetails) => {
							if (matchDetails.isExact) {
								const path = `${matchDetails.params.section}/${matchDetails.params.page}`;
								return <Page section={matchDetails.params.section} path={path} />;
							}
						}}
					/>
				</div>
			</div>
		);
	}
}
