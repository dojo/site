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
	private _renderSectionOutlet(section: string) {
		return [
			<Outlet
				key={`${section}`}
				id={`${section}`}
				renderer={(matchDetails) => {
					if (matchDetails.isExact()) {
						return <Section key={`section-${section}`} section={section} />;
					}
				}}
			/>,
			<Outlet
				key={`${section}-page`}
				id={`${section}-page`}
				renderer={(matchDetails) => {
					return <Section key={`section-${section}`} section={section} path={`${section}/${matchDetails.params.page}`} />;
				}}
			/>
		];
	}

	/*private _renderPageOutlet(page: string) {
		return <Outlet
			key={page}
			id={page}
			renderer={(matchDetails) => {
				return <Page path={page} />;
			}}
		/>;
	}*/

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
					{this._renderSectionOutlet('tutorials')}
				</div>
			</div>
		);
	}
}
