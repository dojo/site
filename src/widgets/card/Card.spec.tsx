import assertionTemplate from '@dojo/framework/testing/assertionTemplate';
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';
import { DNode } from '@dojo/framework/widget-core/interfaces';

import CardHeader from './CardHeader';
import CardIconHeader from './CardIconHeader';
import Card from './Card';

import * as css from './Card.m.css';
import CardFooter from './CardFooter';

describe('Card', () => {
	const baseAssertion = assertionTemplate(() => (
		<div key="card" data-test="card" classes={css.root}>
			{content()}
		</div>
	));

	const content = (...children: DNode[]) => {
		return (
			<div key="content" data-test="content" classes={css.content}>
				{children}
			</div>
		);
	};

	it('default renders', () => {
		const h = harness(() => <Card />);
		h.expect(baseAssertion);
	});

	describe('header', () => {
		it('renders with header', () => {
			const h = harness(() => (
				<Card header={<CardHeader>A header</CardHeader>}>
					<h4>A subtitle</h4>
					Some content
				</Card>
			));

			const assertion = baseAssertion.setChildren('@card', [
				<CardHeader>A header</CardHeader>,
				content(<h4>A subtitle</h4>, 'Some content')
			]);
			h.expect(assertion);
		});

		it('renders with icon header', () => {
			const h = harness(() => (
				<Card header={<CardIconHeader icon="coffee" />}>
					<h4>A subtitle</h4>
					Some content
				</Card>
			));

			const assertion = baseAssertion.setChildren('@card', [
				<CardIconHeader icon="coffee" />,
				content(<h4>A subtitle</h4>, 'Some content')
			]);
			h.expect(assertion);
		});
	});

	it('renders with footer', () => {
		const h = harness(() => (
			<Card footer={<CardFooter>A footer</CardFooter>}>
				<h4>A subtitle</h4>
				Some content
			</Card>
		));

		const assertion = baseAssertion.setChildren('@card', [
			content(<h4>A subtitle</h4>, 'Some content'),
			<CardFooter>A footer</CardFooter>
		]);
		h.expect(assertion);
	});
});
