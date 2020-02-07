import i18nCore from '@dojo/framework/i18n/i18n';
import { tsx, create } from '@dojo/framework/core/vdom';
import i18n from '@dojo/framework/core/middleware/i18n';
import Outlet from '@dojo/framework/routing/Outlet';

import Home from './home/Home';
import Blog from './blog/Blog';
import BlogPosts from './blog/BlogPosts';
import Playground from './playground/Playground';
import Roadmap from './roadmap/Roadmap';
import Learn from './learn/Learn';

import Header from './header/Header';
import Footer from './footer/Footer';

import * as css from './App.m.css';

const factory = create({ i18n });

function isRtl(locale: string) {
	return /^ar(-.*)?$/.test(locale);
}

export default factory(function App({ middleware: { i18n } }) {
	let localeDetails = i18n.get();
	if (!localeDetails || !localeDetails.locale) {
		let rtl = isRtl(i18nCore.locale);
		localeDetails = { locale: i18nCore.locale, rtl };
		i18n.set(localeDetails);
	}
	return (
		<div classes={[css.root]}>
			<Header />
			<div classes={[css.content]}>
				<Outlet key="home" id="home" renderer={() => <Home />} />
				<Outlet
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
				<Outlet
					key="playground"
					id="playground"
					renderer={({ params: { example } }) => <Playground branch="v6" example={example} />}
				/>
				<Outlet key="roadmap" id="roadmap" renderer={() => <Roadmap />} />
				<Outlet
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
