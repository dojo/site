import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
const hero = require('../assets/herobg.png');

import * as css from './Home.m.css';
import FontAwesomeIcon from '../widgets/icon/FontAwesomeIcon';
import Card from '../widgets/card/Card';
import Intersection from '@dojo/framework/widget-core/meta/Intersection';
import has from '@dojo/framework/has/has';
export default class Home extends WidgetBase {
	protected render() {
		const { isIntersecting } = this.meta(Intersection).get('cli');

		const play = isIntersecting || has('build-time-render');

		return (
			<main classes={[css.root]}>
				<section styles={{ backgroundImage: `url(${hero})` }} classes={[css.hero]}>
					<h1 classes={[css.headline]}>A Progressive Framework for Modern Web Apps</h1>
					<button classes={[css.build]}>Build with Dojo</button>
				</section>
				<section classes={[css.ethos]}>
					<Card extraClasses={{ root: css.ethosPoint }}>
						<div classes={[css.ethosTitleContainer]}>
							<span classes={[css.productive]}>
								<FontAwesomeIcon icon="code-branch" />
							</span>
							<h3 classes={[css.ethosTitle]}>Productive</h3>
						</div>
						<div>
							Dojo enables teams to build web applications with a deliberate approach to productivity,
							sustainability and code management.
						</div>
					</Card>
					<Card extraClasses={{ root: css.ethosPoint }}>
						<div classes={[css.ethosTitleContainer]}>
							<span classes={[css.adaptable]}>
								<FontAwesomeIcon icon="plug" />
							</span>
							<h3 classes={[css.ethosTitle]}>Adaptable</h3>
						</div>
						<div>
							Intent on not reinventing the wheel, Dojo allows for easy integration with the most powerful
							solutions available today on the open web.
						</div>
					</Card>
					<Card extraClasses={{ root: css.ethosPoint }}>
						<div classes={[css.ethosTitleContainer]}>
							<span classes={[css.inclusive]}>
								<FontAwesomeIcon icon="users" />
							</span>
							<h3 classes={[css.ethosTitle]}>Inclusive</h3>
						</div>
						<div>
							Demand for accessibility and internationalization are required for enterprise web
							applications. Dojo supports inclusivity and provides both.
						</div>
					</Card>
				</section>
				<section classes={[css.getGoing]}>
					<h2>Get Going Quickly</h2>
					<p classes={[css.getGoingHeadline]}>
						Getting started with Dojo is simple. You can use your command line of choice and{' '}
						<a href="https://www.npmjs.com">npm</a> to get going quickly.{' '}
					</p>
					<div key="cli" classes={[css.cli]}>
						<Card dark={true} extraClasses={{ root: css.commands }}>
							<div classes={[css.command]}>
								<span classes={[css.commandOne, play ? css.commandOneAnimation : null]}>
									npm i @dojo/cli @dojo/cli-create-app -g
								</span>
								<span classes={[play ? css.blinkOne : null]}>|</span>
							</div>
							<div classes={[css.command]}>
								<span classes={[css.commandTwo, play ? css.commandTwoAnimation : null]}>
									{' '}
									dojo create app --name hello-world
								</span>
								<span classes={[play ? css.blinkTwo : null]}>|</span>
							</div>
						</Card>
						<div classes={[css.codeContainer]}>
							<Card dark={true} extraClasses={{ root: play ? css.code : css.hide }}>
								<div classes={[css.codeline]}>
									<span classes={[css.keyword]}>import</span>
									<span classes={[css.variable]}>WidgetBase</span>
									<span classes={[css.keyword]}>from</span>
									<span classes={[css.string]}>'@dojo/framework/widget-core/WidgetBase'</span>
									<span>;</span>
								</div>
								<div classes={[css.codeline]}>
									<span classes={[css.keyword]}>import</span>
									<span classes={[css.variable]}>ProjectorMixin</span>
									<span classes={[css.keyword]}>from</span>
									<span classes={[css.string]}>'@dojo/framework/widget-core/Projector'</span>
									<span>;</span>
								</div>
								<div classes={[css.codeline]}>
									<span classes={[css.keyword]}>import</span>
									<span>{'{ '}</span>
									<span classes={[css.variable]}>v</span>
									<span>{'} '}</span>
									<span classes={[css.keyword]}>from</span>
									<span classes={[css.string]}>'@dojo/framework/widget-core/d'</span>
									<span>;</span>
								</div>
							</Card>
							<Card extraClasses={{
								root: play ? css.result : css.hide,
								content: css.resultContent 
							}}>
								<div classes={[css.check]}>✔</div>
								<div>Success!</div>
							</Card>
						</div>
					</div>
				</section>
				<section>
					<div classes={[css.featureRow, css.featureOne]}>
						<h1 classes={[css.featureTitle]}>A Complete Platform</h1>
						<Card depth={4} extraClasses={{ root: css.featureCardRight }}>
							<ul classes={[css.featurePoints]}>
								<li>
									<h3>Widgets</h3>
									<div>
										Write reusable, reactive, components for your page.
										Dojo allows composition of complex user interfaces
										via it's widget system. 
									</div>
								</li>
								<li>
									<h3>Routing</h3>
									<div>
										Routing out-of-the-box for your application. Declare 
										routes and create navigation flows for your web app.
									</div>
								</li>
								<li>
									<h3>State Management</h3>
									<div>
										Managing state can be difficult. With built-in state
										management via the Dojo Stores system, you can keep
										track and update your application state efficently.
									</div>
								</li>
							</ul>
						</Card>
					</div>
					<div classes={[css.featureRow, css.featureTwo]}>
						<Card depth={4} extraClasses={{ root: css.featureCardLeft }}>
							<ul classes={[css.featurePoints]}>
								<li>
									<h3>Centering Modern Standards</h3>
									<div>
										Dojo encourages the usage of Browser APIs like 
										ResizeObserver and IntersectionObserver, rather 
										than reinventing the wheel.
									</div>
								</li>
								<li>
									<h3>Dynamic Polyfills</h3>
									<div>
										For older browsers Dojo will dynamically load Polyfills
										for users, just shipping them the things they need.
									</div>
								</li>
								<li>
									<h3>Compile to Web Components</h3>
									<div>
										Allow your Widgets to work across other frameworks
										by compiling them to native Web Components.
									</div>
								</li>
							</ul>
						</Card>
						<h1 classes={[css.featureTitle]}>Leverage the Platform</h1>
					</div>
					<div classes={[css.featureRow, css.featureThree]}>
						<h1 classes={[css.featureTitle]}>Building for Everyone</h1>
						<Card depth={4} extraClasses={{ root: css.featureCardRight }}>
							<ul classes={[css.featurePoints]}>
								<li>
									<h3>Internationalization</h3>
									<div>
										Dojo provides the tools to allow you to 
										internationalize your application with ease. 
									</div>
								</li>
								<li>
									<h3>Accessibilility</h3>
									<div>
										Dojo Widgets, the widget library provided alongside 
										the Dojo framework aims to be accessible out-of-the-box.
									</div>
								</li>
								<li>
									<h3>Lightweight by Default</h3>
									<div>
										The core framework for Dojo comes in at 16kb.
										Dojo code splits on routes, so that code is only fetched, 
										compiled, and executed when required.
									</div>
								</li>
							</ul>
						</Card>
					</div>
				</section>
			</main>
		);
	}
}
