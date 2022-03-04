import { tsx, create } from '@dojo/framework/core/vdom';
import Route from '@dojo/framework/routing/Route';

import Home from './home/Home';
import Blog from './blog/Blog';
import BlogPosts from './blog/BlogPosts';
import Playground from './playground/Playground';
import Roadmap from './roadmap/Roadmap';
import Learn from './learn/Learn';

import Header from './header/Header';
import Footer from './footer/Footer';

import * as css from './App.m.css';
import {
	EXAMPLES_BRANCH,
	GUIDES_DEFAULT_BRANCH,
	IS_LATEST,
	OTHER_VERSIONS,
	VERSION_BRANCH,
	WIDGETS_DEFAULT_BRANCH
} from './constants';

const factory = create();

export default factory(function App() {
	return (
		<div classes={[css.root]}>
			<Header widgetsBranch={WIDGETS_DEFAULT_BRANCH} isLatest={IS_LATEST} />
			<div classes={[css.content]}>
				<Route key="home" id="home" renderer={() => <Home />} />
				<Route
					key="blog"
					id="blog"
					renderer={(matchDetails) => {
						const url = matchDetails.router.link('blog', matchDetails.router.currentParams);
						if (matchDetails.isExact()) {
							return <Blog url={url} />;
						}
					}}
				/>
				<BlogPosts />
				<Route
					key="playground"
					id="playground"
					renderer={() => (
						<Playground
							examplesBranch={EXAMPLES_BRANCH}
							example="sandbox"
							type="sandbox"
							branch={EXAMPLES_BRANCH}
						/>
					)}
				/>
				<Route
					key="playground-example"
					id="playground-example"
					renderer={({ params: { example = 'sandbox', type = 'sandbox' } }) => (
						<Playground
							examplesBranch={EXAMPLES_BRANCH}
							example={example}
							type={type}
							branch={EXAMPLES_BRANCH}
						/>
					)}
				/>
				<Route key="roadmap" id="roadmap" renderer={() => <Roadmap />} />
				<Route
					key="learn"
					id="learn"
					renderer={({ params, router }) => {
						const url = router.link('learn', router.currentParams);
						return (
							<Learn
								url={url}
								guidesBranch={GUIDES_DEFAULT_BRANCH}
								guideName={params.guide || 'overview'}
								pageName={params.page || 'introduction'}
							/>
						);
					}}
				/>
			</div>
			<Footer branch={VERSION_BRANCH} isLatest={IS_LATEST} otherVersions={OTHER_VERSIONS} />
		</div>
	);
});
