import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';

import Subsection from './LandingSubsection';
import * as css from './LandingSubsection.m.css';
import assertionTemplate from '@dojo/framework/testing/assertionTemplate';

describe('Landing Subsection', () => {
	const baseAssertion = assertionTemplate(() => (
		<div key="landingSubsection" classes={css.root}>
			Some content
		</div>
	));

	it('renders', () => {
		const h = harness(() => <Subsection>Some content</Subsection>);

		h.expect(baseAssertion);
	});

	it('renders with title', () => {
		const h = harness(() => <Subsection title="A title">Some content</Subsection>);

		const asssertion = baseAssertion.prepend('@landingSubsection', [<h2>A title</h2>]);
		h.expect(asssertion);
	});
});
