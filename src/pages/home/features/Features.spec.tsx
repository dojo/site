import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';
import * as css from './Features.m.css';
import Features from './Features';
import Card from '../../../widgets/card/Card';

describe('Features', () => {
	it('renders', () => {
		const h = harness(() => <Features />);
		h.expect(() => (
			<section classes={[css.root]}>
				<div classes={[css.featureRow, css.featureOne]}>
					<h1 classes={[css.featureTitle]}>A Complete Framework</h1>
					<Card depth={4} extraClasses={{ root: css.featureCardRight }}>
						<ul classes={[css.featurePoints]}>
							<li>
								<h3 classes={[css.topFeaturePoint]}>Widgets</h3>
								<div>
									Write reusable, reactive, components for your page. Dojo allows composition of
									complex user interfaces via it's widget system.
								</div>
							</li>
							<li>
								<h3>Routing</h3>
								<div>
									Routing out-of-the-box for your application. Declare routes and create navigation
									flows for your web app.
								</div>
							</li>
							<li>
								<h3>State Management</h3>
								<div>
									Managing state can be difficult. With built-in state management via the Dojo Stores
									system, you can keep track and update your application state efficently.
								</div>
							</li>
						</ul>
					</Card>
				</div>
				<div classes={[css.featureRow, css.featureTwo]}>
					<Card depth={4} extraClasses={{ root: css.featureCardLeft }}>
						<ul classes={[css.featurePoints]}>
							<li>
								<h3 classes={[css.topFeaturePoint]}>Centering Modern Standards</h3>
								<div>
									Dojo encourages the usage of Browser APIs like ResizeObserver and
									IntersectionObserver, rather than reinventing the wheel.
								</div>
							</li>
							<li>
								<h3>Dynamic Polyfills</h3>
								<div>
									For older browsers Dojo will dynamically load Polyfills for users, just shipping
									them the things they need.
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
					<h1 classes={[css.featureTitle]}>Leverage the Platform</h1>
				</div>
				<div classes={[css.featureRow, css.featureThree]}>
					<h1 classes={[css.featureTitle]}>Build for Everyone</h1>
					<Card depth={4} extraClasses={{ root: css.featureCardRight }}>
						<ul classes={[css.featurePoints]}>
							<li>
								<h3 classes={[css.topFeaturePoint]}>Internationalization</h3>
								<div>
									Dojo provides the tools to allow you to internationalize your application with ease,
									serving your web app in the language of your users.
								</div>
							</li>
							<li>
								<h3>Accessibilility</h3>
								<div>
									Dojo Widgets, the widget library provided alongside the Dojo framework aims to be
									accessible out-of-the-box.
								</div>
							</li>
							<li>
								<h3>Lightweight by Default</h3>
								<div>
									The core framework for Dojo comes in at 16kb. Dojo code splits on routes, so that
									code is only fetched, compiled, and executed when required.
								</div>
							</li>
						</ul>
					</Card>
				</div>
			</section>
		));
	});
});
