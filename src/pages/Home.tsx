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
			<div classes={[css.root]}>
				<div styles={{ backgroundImage: `url(${hero})` }} classes={[css.hero]}>
					<h1 classes={[css.headline]}>A Progressive Framework for Modern Web Apps</h1>
					<button classes={[css.build]}>Build with Dojo</button>
				</div>
				<div classes={[css.ethos]}>
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
				</div>
				<div classes={[css.getGoing]}>
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
							<Card extraClasses={{ root: play ? css.result : css.hide }}>
								<div classes={[css.check]}>✔</div>
								<div>Success!</div>
							</Card>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
