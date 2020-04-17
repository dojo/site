import { add } from '@dojo/framework/core/has';
add('test', true, true);

import assertionTemplate from '@dojo/framework/testing/harness/assertionTemplate';
import harness from '@dojo/framework/testing/harness/harness';
import { tsx } from '@dojo/framework/core/vdom';
import createIntersectionMock from '@dojo/framework/testing/mocks/middleware/intersection';
import intersection from '@dojo/framework/core/middleware/intersection';

import Card from '../../card/Card';

import * as css from '../GetGoing.m.css';
import GetGoing from '../GetGoing';

describe('GetGoing', () => {
	const baseAssertion = assertionTemplate(() => (
		<section classes={[css.root]}>
			<h2>Get Going Quickly</h2>
			<p classes={[css.headline]}>
				Getting started with Dojo is simple. You can use your command line of choice and npm to get going
				quickly.
			</p>
			<div key="cli" classes={[css.cli]}>
				<Card dark classes={{ 'dojo.io/Card': { root: [css.commands], content: [css.commandsContent] } }}>
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
					<Card dark classes={{ 'dojo.io/Card': { root: [css.code] } }}>
						<div classes={[css.codeline]}>
							<span classes={[css.keyword]}>import </span>
							<span classes={[css.variable]}>renderer</span>
							<span>{', { '}</span>
							<span classes={[css.variable]}>create</span>
							<span>{', '}</span>
							<span classes={[css.variable]}>tsx</span>
							<span>{' } '}</span>
							<span classes={[css.keyword]}>from </span>
							<span classes={[css.string]}>'@dojo/framework/core/vdom'</span>
							<span>;</span>
						</div>
						<div classes={[css.codeline]}>
							<span>&nbsp;</span>
						</div>
						<div classes={[css.codeline]}>
							<span classes={[css.keyword]}>const </span>
							<span classes={[css.variable]}>factory</span>
							<span>{` = `}</span>
							<span classes={[css.variable]}>create</span>
							<span>();</span>
						</div>
						<div classes={[css.codeline]}>
							<span classes={[css.keyword]}>const </span>
							<span classes={[css.variable]}>App </span>
							<span>{` = `}</span>
							<span classes={[css.variable]}>factory</span>
							<span>(</span>
							<span classes={[css.keyword]}>function </span>
							<span classes={[css.variable]}>App</span>
							<span>{`() {`}</span>
						</div>
						<div classes={[css.codeline]}>
							<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
							<span classes={[css.keyword]}>return</span>
							<span>{` <`}</span>
							<span classes={[css.variable]}>div</span>
							<span>{`>Hello, Dojo World!</`}</span>
							<span classes={[css.variable]}>div</span>
							<span>{`>;`}</span>
						</div>
						<div classes={[css.codeline]}>
							<span>{`});`}</span>
						</div>
						<div classes={[css.codeline]}>
							<span classes={[css.keyword]}>const </span>
							<span classes={[css.variable]}>r</span>
							<span>{` = `}</span>
							<span classes={[css.variable]}>renderer</span>
							<span>{`(() => <`}</span>
							<span classes={[css.variable]}>App</span>
							<span>{`/>);`}</span>
						</div>
						<div classes={[css.codeline]}>
							<span classes={[css.variable]}>r</span>
							<span>.</span>
							<span classes={[css.variable]}>mount</span>
							<span>();</span>
						</div>
					</Card>
					<Card
						classes={{
							'dojo.io/Card': {
								root: [css.result],
								content: [css.resultContent]
							}
						}}
					>
						<div classes={[css.check]}>✔</div>
						<div>Success!</div>
					</Card>
				</div>
			</div>
		</section>
	));

	const playingAssertion = assertionTemplate(() => (
		<section classes={[css.root]}>
			<h2>Get Going Quickly</h2>
			<p classes={[css.headline]}>
				Getting started with Dojo is simple. You can use your command line of choice and npm to get going
				quickly.
			</p>
			<div key="cli" classes={[css.cli]}>
				<Card dark classes={{ 'dojo.io/Card': { root: [css.commands], content: [css.commandsContent] } }}>
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
					<Card dark classes={{ 'dojo.io/Card': { root: [css.code] } }}>
						<div classes={[css.codeline]}>
							<span classes={[css.keyword]}>import </span>
							<span classes={[css.variable]}>renderer</span>
							<span>{', { '}</span>
							<span classes={[css.variable]}>create</span>
							<span>{', '}</span>
							<span classes={[css.variable]}>tsx</span>
							<span>{' } '}</span>
							<span classes={[css.keyword]}>from </span>
							<span classes={[css.string]}>'@dojo/framework/core/vdom'</span>
							<span>;</span>
						</div>
						<div classes={[css.codeline]}>
							<span>&nbsp;</span>
						</div>
						<div classes={[css.codeline]}>
							<span classes={[css.keyword]}>const </span>
							<span classes={[css.variable]}>factory</span>
							<span>{` = `}</span>
							<span classes={[css.variable]}>create</span>
							<span>();</span>
						</div>
						<div classes={[css.codeline]}>
							<span classes={[css.keyword]}>const </span>
							<span classes={[css.variable]}>App </span>
							<span>{` = `}</span>
							<span classes={[css.variable]}>factory</span>
							<span>(</span>
							<span classes={[css.keyword]}>function </span>
							<span classes={[css.variable]}>App</span>
							<span>{`() {`}</span>
						</div>
						<div classes={[css.codeline]}>
							<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
							<span classes={[css.keyword]}>return</span>
							<span>{` <`}</span>
							<span classes={[css.variable]}>div</span>
							<span>{`>Hello, Dojo World!</`}</span>
							<span classes={[css.variable]}>div</span>
							<span>{`>;`}</span>
						</div>
						<div classes={[css.codeline]}>
							<span>{`});`}</span>
						</div>
						<div classes={[css.codeline]}>
							<span classes={[css.keyword]}>const </span>
							<span classes={[css.variable]}>r</span>
							<span>{` = `}</span>
							<span classes={[css.variable]}>renderer</span>
							<span>{`(() => <`}</span>
							<span classes={[css.variable]}>App</span>
							<span>{`/>);`}</span>
						</div>
						<div classes={[css.codeline]}>
							<span classes={[css.variable]}>r</span>
							<span>.</span>
							<span classes={[css.variable]}>mount</span>
							<span>();</span>
						</div>
					</Card>
					<Card
						classes={{
							'dojo.io/Card': {
								root: [css.result],
								content: [css.resultContent]
							}
						}}
					>
						<div classes={[css.check]}>✔</div>
						<div>Success!</div>
					</Card>
				</div>
			</div>
		</section>
	));

	it('renders', () => {
		const h = harness(() => <GetGoing />);

		h.expect(baseAssertion);
	});

	it('renders intersecting', () => {
		const mockIntersection = createIntersectionMock();
		const h = harness(() => <GetGoing />, { middleware: [[intersection, mockIntersection]] });

		h.expect(baseAssertion);

		mockIntersection('cli', { isIntersecting: true });

		h.expect(playingAssertion);
	});

	it('renders in BTR', () => {
		add('build-time-render', true, true);
		const h = harness(() => <GetGoing />);

		h.expect(playingAssertion);
	});
});
