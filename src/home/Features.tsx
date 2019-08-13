import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';

import Card from '../card/Card';

import * as css from './Features.m.css';

const factory = create({ theme });

export default factory(function Features({ middleware: { theme } }) {
	const themedCss = theme.classes(css);

	return (
		<section classes={[themedCss.root]}>
			<div classes={[themedCss.featureRow, themedCss.featureOne]}>
				<h1 classes={[themedCss.featureTitle]}>A Complete Framework</h1>
				<Card depth={4} classes={{ 'dojo.io/Card': { root: [themedCss.featureCardRight] } }}>
					<ul classes={[themedCss.featurePoints]}>
						<li>
							<h3 classes={[themedCss.topFeaturePoint]}>Widgets</h3>
							<div>
								Write reusable, reactive components for your page. Dojo allows composition of complex
								user interfaces via its widget system.
							</div>
						</li>
						<li>
							<h3>Routing</h3>
							<div>
								Routing out-of-the-box for your application. Declare routes and create navigation flows
								for your web app.
							</div>
						</li>
						<li>
							<h3>State Management</h3>
							<div>
								Managing state can be difficult. With built-in state management via the Dojo Stores
								system, you can track and update your application state efficiently.
							</div>
						</li>
					</ul>
				</Card>
			</div>
			<div classes={[themedCss.featureRow, themedCss.featureTwo]}>
				<Card depth={4} classes={{ 'dojo.io/Card': { root: [themedCss.featureCardLeft] } }}>
					<ul classes={[themedCss.featurePoints]}>
						<li>
							<h3 classes={[themedCss.topFeaturePoint]}>Centering Modern Standards</h3>
							<div>
								Dojo encourages the usage of Browser APIs like ResizeObserver and IntersectionObserver,
								rather than reinventing the wheel.
							</div>
						</li>
						<li>
							<h3>Dynamic Polyfills</h3>
							<div>
								For older browsers Dojo will dynamically load Polyfills for users, just shipping them
								the things they need.
							</div>
						</li>
						<li>
							<h3>Compile to Web Components</h3>
							<div>
								Allow your Widgets to work across other frameworks by compiling them to native Web
								Components.
							</div>
						</li>
					</ul>
				</Card>
				<h1 classes={[themedCss.featureTitle]}>Leverage the Platform</h1>
			</div>
			<div classes={[themedCss.featureRow, themedCss.featureThree]}>
				<h1 classes={[themedCss.featureTitle]}>Build for Everyone</h1>
				<Card depth={4} classes={{ 'dojo.io/Card': { root: [themedCss.featureCardRight] } }}>
					<ul classes={[themedCss.featurePoints]}>
						<li>
							<h3 classes={[themedCss.topFeaturePoint]}>Internationalization</h3>
							<div>
								Dojo provides the tools to allow you to internationalize your application with ease,
								serving your web app in the language of your users.
							</div>
						</li>
						<li>
							<h3>Accessibilility</h3>
							<div>
								Dojo Widgets, the widget library provided alongside the Dojo framework, aims to be
								accessible out-of-the-box.
							</div>
						</li>
						<li>
							<h3>Lightweight by Default</h3>
							<div>
								The core framework for Dojo comes in at 16kb. Dojo code splits on routes, so that code
								is only fetched, compiled, and executed when required.
							</div>
						</li>
					</ul>
				</Card>
			</div>
		</section>
	);
});
