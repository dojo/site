import harness from '@dojo/framework/testing/harness';
import assertionTemplate from '@dojo/framework/testing/assertionTemplate';
import { tsx } from '@dojo/framework/widget-core/tsx';
import { add } from '@dojo/framework/has/has';
import Intersection from '@dojo/framework/widget-core/meta/Intersection';

import Card from '../../../widgets/card/Card';

import { MockMetaMixin } from '../../../test/util/MockMeta';

import * as css from './GetGoing.m.css';
import GetGoing from './GetGoing';

describe('GetGoing', () => {
	const notPlayingAssertion = assertionTemplate(() => (
		<section classes={[css.root]}>
			<h2>Get Going Quickly</h2>
			<p classes={[css.headline]}>
				Getting started with Dojo is simple. You can use your command line of choice and{' '}
				<a href="https://www.npmjs.com">npm</a> to get going quickly.
			</p>
			<div key="cli" classes={[css.cli]}>
				<Card dark classes={{ 'dojo.io/Card': { root: [css.commands], content: [css.commandsContent] } }}>
					<div classes={[css.command]}>
						<span assertion-key="commandOne" classes={[css.commandOne, null]}>
							npm i @dojo/cli @dojo/cli-create-app -g
						</span>
						<span assertion-key="blinkOne" classes={[null]}>
							|
						</span>
					</div>
					<div classes={[css.command]}>
						<span assertion-key="commandTwo" classes={[css.commandTwo, null]}>
							dojo create app --name hello-world
						</span>
						<span assertion-key="blinkTwo" classes={[null]}>
							|
						</span>
					</div>
				</Card>
				<div classes={[css.codeContainer]}>
					<Card assertion-key="cardOne" dark classes={{ 'dojo.io/Card': { root: [css.hide] } }}>
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
					<Card
						assertion-key="cardTwo"
						classes={{ 'dojo.io/Card': { root: [css.hide], content: [css.resultContent] } }}
					>
						<div classes={[css.check]}>✔</div>
						<div>Success!</div>
					</Card>
				</div>
			</div>
		</section>
	));

	const playingAssertion = notPlayingAssertion
		.setProperty('~commandOne', 'classes', [css.commandOne, css.commandOneAnimation])
		.setProperty('~commandTwo', 'classes', [css.commandTwo, css.commandTwoAnimation])
		.setProperty('~blinkOne', 'classes', [css.blinkOne])
		.setProperty('~blinkTwo', 'classes', [css.blinkTwo])
		.setProperty('~cardOne', 'classes', { 'dojo.io/Card': { root: [css.code] } })
		.setProperty('~cardTwo', 'classes', { 'dojo.io/Card': { root: [css.result], content: [css.resultContent] } });

	it('renders not playing', () => {
		add('build-time-render', false, true);
		const h = harness(() => <GetGoing />);
		h.expect(notPlayingAssertion);
	});

	it('renders playing', () => {
		add('build-time-render', true, true);
		const h = harness(() => <GetGoing />);
		h.expect(playingAssertion);
	});

	it('starts playing on intersection', () => {
		jest.useFakeTimers();
		add('build-time-render', false, true);

		const mockMetaMixin = new MockMetaMixin(GetGoing);
		mockMetaMixin.registerMetaCallOnce(
			Intersection,
			'get',
			['cli'],
			{
				isIntersecting: false
			},
			{
				value: { isIntersecting: true },
				shouldInvalidate: true
			}
		);

		const MockGetGoing = mockMetaMixin.getClass();

		const h = harness(() => <MockGetGoing />);
		h.expect(notPlayingAssertion);

		jest.runAllTimers();

		h.expect(playingAssertion);
	});
});
