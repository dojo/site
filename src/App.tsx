import { tsx, create } from '@dojo/framework/core/vdom';
import Outlet from '@dojo/framework/routing/Outlet';

import Home from './home/Home';
import Blog from './blog/Blog';
import BlogPosts from './blog/BlogPosts';
import Examples from './examples/Examples';
import Playground from './playground/Playground';
import Roadmap from './roadmap/Roadmap';
import Community from './community/Community';
import ReferenceGuides from './reference-guides/ReferenceGuides';
import ReferenceGuidesLanding from './reference-guides/ReferenceGuidesLanding';

import Header from './header/Header';
import Footer from './footer/Footer';

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
import { faPalette } from '@fortawesome/free-solid-svg-icons/faPalette';
import { faSitemap } from '@fortawesome/free-solid-svg-icons/faSitemap';

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
	faChevronDown,
	faPalette,
	faSitemap
);

const factory = create();

export default factory(function App() {
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
});
