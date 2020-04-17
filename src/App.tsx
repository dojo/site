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

const factory = create();

export default factory(function App() {
	return (
		<div classes={[css.root]}>
			<Header />
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
					renderer={() => <Playground example="sandbox" type="sandbox" />}
				/>
				<Route
					key="playground-example"
					id="playground-example"
					renderer={({ params: { example = 'sandbox', type = 'sandbox' } }) => (
						<Playground example={example} type={type} />
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
								guideName={params.guide || 'overview'}
								pageName={params.page || 'introduction'}
							/>
						);
					}}
				/>
			</div>
			<Footer />
		</div>
	);
});
