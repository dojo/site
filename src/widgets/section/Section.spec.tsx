import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';
import assertionTemplate from '@dojo/framework/testing/assertionTemplate';

import Section from './Section';
import * as css from './Section.m.css';

describe('Section', () => {
	const baseAssertionTemplate = assertionTemplate(() => <div classes={css.root}>Some content</div>);

	it('renders', () => {
		const h = harness(() => <Section>Some content</Section>);

		h.expect(baseAssertionTemplate);
	});
});
