import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';
import { add } from '@dojo/framework/core/has';
import * as css from './GetGoing.m.css';
import Hero from './GetGoing';
import Card from '../../../widgets/card/Card';

describe('GetGoing', () => {
	it('renders', () => {
		add('build-time-render', true, false);
		const h = harness(() => <Hero />);
		h.expect(() => (
			<section classes={[css.root]}>
				<h2>Get Going Quickly</h2>
				<p classes={[css.headline]}>
					Getting started with Dojo is simple. You can use your command line of choice and{' '}
					<a href="https://www.npmjs.com">npm</a> to get going quickly.
				</p>
				<div key="cli" classes={[css.cli]}>
					<Card dark extraClasses={{ root: css.commands, content: css.commandsContent }}>
						<div classes={[css.command]}>
							<span classes={[css.commandOne, css.commandOneAnimation]}>
								npm i @dojo/cli @dojo/cli-create-app -g
							</span>
							<span classes={[css.blinkOne]}>|</span>
						</div>
						<div classes={[css.command]}>
							<span classes={[css.commandTwo, css.commandTwoAnimation]}>
								dojo create app --name hello-world
							</span>
							<span classes={[css.blinkTwo]}>|</span>
						</div>
					</Card>
					<div classes={[css.codeContainer]}>
						<Card dark extraClasses={{ root: css.code }}>
							<div classes={[css.codeline]}>
								<span classes={[css.keyword]}>import</span>
								<span classes={[css.variable]}>WidgetBase</span>
								<span classes={[css.keyword]}>from</span>
								<span classes={[css.string]}>'@dojo/framework/core/WidgetBase'</span>
								<span>;</span>
							</div>
							<div classes={[css.codeline]}>
								<span classes={[css.keyword]}>import</span>
								<span classes={[css.variable]}>ProjectorMixin</span>
								<span classes={[css.keyword]}>from</span>
								<span classes={[css.string]}>'@dojo/framework/core/Projector'</span>
								<span>;</span>
							</div>
							<div classes={[css.codeline]}>
								<span classes={[css.keyword]}>import</span>
								<span>{'{ '}</span>
								<span classes={[css.variable]}>v</span>
								<span>{'} '}</span>
								<span classes={[css.keyword]}>from</span>
								<span classes={[css.string]}>'@dojo/framework/core/vdom'</span>
								<span>;</span>
							</div>
						</Card>
						<Card
							extraClasses={{
								root: css.result,
								content: css.resultContent
							}}
						>
							<div classes={[css.check]}>✔</div>
							<div>Success!</div>
						</Card>
					</div>
				</div>
			</section>
		));
	});
});
