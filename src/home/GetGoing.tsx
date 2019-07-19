import { tsx, create } from '@dojo/framework/core/vdom';
import has from '@dojo/framework/core/has';
import theme from '@dojo/framework/core/middleware/theme';
import intersection from '@dojo/framework/core/middleware/intersection';

import Card from '../card/Card';

import * as css from './GetGoing.m.css';

const factory = create({ theme, intersection });

export default factory(function GetGoing({ middleware: { theme, intersection } }) {
	const themedCss = theme.classes(css);
	const { isIntersecting } = intersection.get('cli');

	const play = isIntersecting || has('build-time-render');

	return (
		<section classes={[themedCss.root]}>
			<h2>Get Going Quickly</h2>
			<p classes={[themedCss.headline]}>
				Getting started with Dojo is simple. You can use your command line of choice and{' '}
				<a href="https://www.npmjs.com">npm</a> to get going quickly.
			</p>
			<div key="cli" classes={[themedCss.cli]}>
				<Card
					dark
					classes={{ 'dojo.io/Card': { root: [themedCss.commands], content: [themedCss.commandsContent] } }}
				>
					<div classes={[themedCss.command]}>
						<span classes={[themedCss.commandOne, play ? themedCss.commandOneAnimation : null]}>
							npm i @dojo/cli @dojo/cli-create-app -g
						</span>
						<span classes={[play ? themedCss.blinkOne : null]}>|</span>
					</div>
					<div classes={[themedCss.command]}>
						<span classes={[themedCss.commandTwo, play ? themedCss.commandTwoAnimation : null]}>
							dojo create app --name hello-world
						</span>
						<span classes={[play ? themedCss.blinkTwo : null]}>|</span>
					</div>
				</Card>
				<div classes={[themedCss.codeContainer]}>
					<Card dark classes={{ 'dojo.io/Card': { root: [play ? themedCss.code : themedCss.hide] } }}>
						<div classes={[themedCss.codeline]}>
							<span classes={[themedCss.keyword]}>import</span>
							<span classes={[themedCss.variable]}>WidgetBase</span>
							<span classes={[themedCss.keyword]}>from</span>
							<span classes={[themedCss.string]}>'@dojo/framework/core/WidgetBase'</span>
							<span>;</span>
						</div>
						<div classes={[themedCss.codeline]}>
							<span classes={[themedCss.keyword]}>import</span>
							<span classes={[themedCss.variable]}>ProjectorMixin</span>
							<span classes={[themedCss.keyword]}>from</span>
							<span classes={[themedCss.string]}>'@dojo/framework/core/Projector'</span>
							<span>;</span>
						</div>
						<div classes={[themedCss.codeline]}>
							<span classes={[themedCss.keyword]}>import</span>
							<span>{'{ '}</span>
							<span classes={[themedCss.variable]}>v</span>
							<span>{'} '}</span>
							<span classes={[themedCss.keyword]}>from</span>
							<span classes={[themedCss.string]}>'@dojo/framework/core/vdom'</span>
							<span>;</span>
						</div>
					</Card>
					<Card
						classes={{
							'dojo.io/Card': {
								root: [play ? themedCss.result : themedCss.hide],
								content: [themedCss.resultContent]
							}
						}}
					>
						<div classes={[themedCss.check]}>✔</div>
						<div>Success!</div>
					</Card>
				</div>
			</div>
		</section>
	);
});
