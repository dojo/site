import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Outlet from '@dojo/framework/routing/Outlet';

import Header from './widgets/header/Header';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPosts from './pages/blog/BlogPosts';
import Examples from './pages/Examples';
import Playground from './pages/Playground';
import Roadmap from './pages/Roadmap';
import Community from './pages/Community';
import ReferenceGuides from './pages/reference-guides/ReferenceGuides';
import ReferenceGuidesLanding from './pages/ReferenceGuidesLanding';

import * as css from './App.m.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons/faCloudDownloadAlt';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons/faGraduationCap';
import { faListAlt } from '@fortawesome/free-solid-svg-icons/faListAlt';
import { faAppleAlt } from '@fortawesome/free-solid-svg-icons/faAppleAlt';
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons/faCodeBranch';
import { faPlug } from '@fortawesome/free-solid-svg-icons/faPlug';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons/faLaptopCode';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons/faExternalLinkAlt';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons/faBoxOpen';
import { faBox } from '@fortawesome/free-solid-svg-icons/faBox';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import Footer from './widgets/footer/Footer';

library.add(
	faCloudDownloadAlt,
	faGraduationCap,
	faListAlt,
	faAppleAlt,
	faGlobe,
	faCodeBranch,
	faPlug,
	faUsers,
	faLaptopCode,
	faExternalLinkAlt,
	faBoxOpen,
	faBox,
	faChevronRight,
	faChevronDown
);

export default class App extends WidgetBase {
	protected render() {
		return (
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
					<Outlet key="community" id="community" renderer={() => <Community />} />
					<Outlet key="reference-guides" id="reference-guides" renderer={() => <ReferenceGuidesLanding />} />
					<ReferenceGuides />
				</div>
				<Footer />
			</div>
		);
	}
}
