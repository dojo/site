import assertionTemplate from '@dojo/framework/testing/assertionTemplate';
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';

import CardFooter from '../CardFooter';
import * as css from '../CardFooter.m.css';

describe('CardFooter', () => {
	const baseAssertion = assertionTemplate(() => <footer key="card-footer" data-test="footer" classes={css.root} />);

	it('default renders', () => {
		const h = harness(() => <CardFooter />);
		h.expect(baseAssertion);
	});

	it('renders children', () => {
		const h = harness(() => (
			<CardFooter>
				<span>foo</span>
			</CardFooter>
		));

		const assertion = baseAssertion.setChildren('@card-footer', () => [<span>foo</span>]);
		h.expect(assertion);
	});
});
