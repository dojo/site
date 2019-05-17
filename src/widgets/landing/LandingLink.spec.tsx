import { tsx } from '@dojo/framework/widget-core/tsx';
import assertionTemplate from '@dojo/framework/testing/assertionTemplate';
import harness from '@dojo/framework/testing/harness';

import * as css from './LandingLink.m.css';
import LandingLink from './LandingLink';
import LinkedCard from '../card/LinkedCard';
import CardIconHeader from '../card/CardIconHeader';

describe('Landing Link', () => {
	const baseAssertion = assertionTemplate(() => (
		<div classes={css.root}>
			<LinkedCard
				assertion-key='linkedCard'
				header={<CardIconHeader icon="list-alt" background="blue" />}
				outlet="outlet"
				params={undefined}
			>
				<h4 classes={css.title}>A title</h4>
				Some content
			</LinkedCard>
		</div>
	));

	it('renders', () => {
		const h = harness(() => (
			<LandingLink title="A title" to="outlet" icon="list-alt">
				Some content
			</LandingLink>
		));

		h.expect(baseAssertion);
	});

	it('renders with link params', () => {
		const h = harness(() => (
			<LandingLink title="A title" to="outlet" icon="list-alt" params={{ key: 'value' }}>
				Some content
			</LandingLink>
		));

		const assertion = baseAssertion.setProperty('~linkedCard', 'params', { key: 'value' });
		h.expect(assertion);
	});

	it('renders with different background color', () => {
		const h = harness(() => (
			<LandingLink title="A title" to="outlet" icon="list-alt" color="purple">
				Some content
			</LandingLink>
		));

		const assertion = baseAssertion.setProperty(
			'~linkedCard',
			'header',
			<CardIconHeader icon="list-alt" background="purple" />
		);
		h.expect(assertion);
	});
});
