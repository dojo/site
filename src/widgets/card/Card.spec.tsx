import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
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

	class TestWidget extends WidgetBase {
		protected render(): DNode {
			return <div>Hello!</div>;
		}
	}

	describe('header', () => {
		it('renders with header', () => {
			const h = harness(() => (
				<Card>
					<CardHeader>A header</CardHeader>
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
				<Card>
					<CardIconHeader icon="coffee" />
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
			<Card>
				<h4>A subtitle</h4>
				Some content
				<CardFooter>A footer</CardFooter>
			</Card>
		));

		const assertion = baseAssertion.setChildren('@card', [
			content(<h4>A subtitle</h4>, 'Some content'),
			<CardFooter>A footer</CardFooter>
		]);
		h.expect(assertion);
	});

	it('renders unrecognized widgets as content', () => {
		const h = harness(() => (
			<Card>
				<CardHeader>A header</CardHeader>
				<h4>A subtitle</h4>
				Some content
				<CardFooter>A footer</CardFooter>
				<TestWidget />
			</Card>
		));

		const assertion = baseAssertion.setChildren('@card', [
			<CardHeader>A header</CardHeader>,
			content(<h4>A subtitle</h4>, 'Some content', <TestWidget />),
			<CardFooter>A footer</CardFooter>
		]);
		h.expect(assertion);
	});
});
