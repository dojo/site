import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';
import Link from '@dojo/framework/routing/Link';

import Card from '../Card';
import CardHeader from '../CardHeader';
import CardFooter from '../CardFooter';

import LinkedCard from '../LinkedCard';
import * as css from '../LinkedCard.m.css';

describe('Linked Card', () => {
	it('renders without link', () => {
		const h = harness(() => <LinkedCard />);
		h.expect(() => <Card />);
	});

	it('passes children to Card', () => {
		const h = harness(() => (
			<LinkedCard>
				<CardHeader>A header!</CardHeader>
				Some other content
				<CardFooter>A footer!</CardFooter>
			</LinkedCard>
		));
		h.expect(() => (
			<Card>
				<CardHeader>A header!</CardHeader>
				Some other content
				<CardFooter>A footer!</CardFooter>
			</Card>
		));
	});

	it('renders a with href', () => {
		const h = harness(() => <LinkedCard url="link/to/somewhere" />);
		h.expect(() => (
			<div classes={css.root}>
				<a classes={css.link} href="link/to/somewhere" target="_blank" />
				<Card />
			</div>
		));
	});

	it('renders link widget to outlet', () => {
		const h = harness(() => <LinkedCard outlet="some-outlet" />);
		h.expect(() => (
			<div classes={css.root}>
				<Link classes={css.link} to="some-outlet" params={undefined} />
				<Card />
			</div>
		));
	});

	it('renders outlet with parameters', () => {
		const parameters = { param1: 'something' };
		const h = harness(() => <LinkedCard outlet="some-outlet" params={parameters} />);
		h.expect(() => (
			<div classes={css.root}>
				<Link classes={css.link} to="some-outlet" params={parameters} />
				<Card />
			</div>
		));
	});
});
