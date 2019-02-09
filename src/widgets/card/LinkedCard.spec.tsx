import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Link from '@dojo/framework/routing/Link';

import Card from './Card';
import LinkedCard from './LinkedCard';
import * as css from './LinkedCard.m.css';

describe('Linked Card', () => {
	it('renders without link', () => {
		const h = harness(() => <LinkedCard />);
		h.expect(() => <Card />);
	});

	it('passes properties to child card', () => {
		const cardFooter = <div>Some Footer</div>;
		const h = harness(() => <LinkedCard title="foo" footer={cardFooter} />);
		h.expect(() => <Card title="foo" footer={cardFooter} />);
	});

	it('renders a with href', () => {
		const h = harness(() => <LinkedCard url="link/to/somewhere" title="foo" />);
		h.expect(() => (
			<a classes={css.root} href="link/to/somewhere">
				<Card title="foo" />
			</a>
		));
	});

	it('renders link widget to outlet', () => {
		const h = harness(() => <LinkedCard outlet="some-outlet" />);
		h.expect(() => (
			<Link classes={css.root} to="some-outlet" params={undefined}>
				<Card />
			</Link>
		));
	});

	it('renders link widget to outlet with parameters', () => {
		const parameters = { param1: 'something' };
		const h = harness(() => <LinkedCard outlet="some-outlet" params={parameters} />);
		h.expect(() => (
			<Link classes={css.root} to="some-outlet" params={parameters}>
				<Card />
			</Link>
		));
	});
});
