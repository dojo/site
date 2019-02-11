import assertionTemplate from '@dojo/framework/testing/assertionTemplate';
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';

import CardHeader from './CardHeader';
import * as css from './CardHeader.m.css';

describe('CardFooter', () => {
	const baseAssertion = assertionTemplate(() => (
		<header key="card-header" data-test="card-header" classes={css.root} />
	));

	it('default renders', () => {
		const h = harness(() => <CardHeader />);
		h.expect(baseAssertion);
	});

	describe('children', () => {
		it('renders children', () => {
			const h = harness(() => (
				<CardHeader>
					<span>foo</span>
				</CardHeader>
			));

			const assertion = baseAssertion.setChildren('@card-header', [<span>foo</span>]);
			h.expect(assertion);
		});

		it('ignores title and image parameters if children provided', () => {
			const h = harness(() => (
				<CardHeader title="A title" image={{ src: 'path/to/src.png', alt: 'an alt' }}>
					<span>foo</span>
				</CardHeader>
			));

			const assertion = baseAssertion.setChildren('@card-header', [<span>foo</span>]);
			h.expect(assertion);
		});
	});

	it('renders title', () => {
		const h = harness(() => <CardHeader title="A title" />);

		const assertion = baseAssertion.setChildren('@card-header', ['A title']);
		h.expect(assertion);
	});

	describe('image', () => {
		it('renders title and image from string', () => {
			const h = harness(() => <CardHeader title="A title" image="path/to/src.png" />);

			const assertion = baseAssertion.setChildren('@card-header', [
				<img src="path/to/src.png" classes={css.image} />,
				'A title'
			]);
			h.expect(assertion);
		});

		it('renders title and image from object', () => {
			const h = harness(() => <CardHeader title="A title" image={{ src: 'path/to/src.png' }} />);

			const assertion = baseAssertion.setChildren('@card-header', [
				<img src="path/to/src.png" classes={css.image} />,
				'A title'
			]);
			h.expect(assertion);
		});

		it('renders title and image from object with alt', () => {
			const h = harness(() => <CardHeader title="A title" image={{ src: 'path/to/src.png', alt: 'an alt' }} />);

			const assertion = baseAssertion.setChildren('@card-header', [
				<img src="path/to/src.png" alt="an alt" classes={css.image} />,
				'A title'
			]);
			h.expect(assertion);
		});

		it('does not render image if no title provided', () => {
			const h = harness(() => <CardHeader image="path/to/src.png" />);

			h.expect(baseAssertion);

			const h2 = harness(() => <CardHeader image={{ src: 'path/to/src.png', alt: 'an alt' }} />);

			h2.expect(baseAssertion);
		});
	});
});
