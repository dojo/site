import Card from './Card';
import * as css from './Card.m.css';
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';
import { DNode } from '@dojo/framework/widget-core/interfaces';

interface CardOptions {
	header?: DNode | DNode[] | string;
	footer?: DNode | DNode[];
}

describe('Card', () => {
	const expected = function(options?: CardOptions, children: DNode | DNode[] = []) {
		const { header = undefined, footer = undefined } = options || {};

		return (
			<div data-test="card" classes={css.root}>
				{header && (
					<header key="header" data-test="header" classes={css.header}>
						{header}
					</header>
				)}
				<div classes={css.content}>{children}</div>
				{footer && (
					<footer data-test="footer" classes={css.footer}>
						{footer}
					</footer>
				)}
			</div>
		);
	};

	it('default renders', () => {
		const h = harness(() => <Card />);
		h.expect(() => expected({}));
	});

	describe('header', () => {
		it('renders a title', () => {
			const h = harness(() => <Card title="foo" />);
			h.expect(() => expected({ header: 'foo' }));
		});

		it('renders a title and image (object)', () => {
			const h = harness(() => (
				<Card
					title="foo"
					image={{
						src: 'somewhere',
						alt: 'an image'
					}}
				/>
			));
			h.expect(() => expected({ header: [<img src="somewhere" alt="an image" />, 'foo'] }));
		});

		it('renders a title and image (string)', () => {
			const h = harness(() => <Card title="foo" image="somewhere" />);
			h.expect(() => expected({ header: [<img src="somewhere" />, 'foo'] }));
		});

		it('renders provided header', () => {
			const header = <h1>Some Header</h1>;

			const h = harness(() => <Card header={header} />);
			h.expect(() => expected({ header: header }));
		});
	});

	describe('footer', () => {
		it('renders a footer', () => {
			const footer = <p>Some Footer</p>;

			const h = harness(() => <Card footer={footer} />);
			h.expect(() => expected({ footer: footer }));
		});

		test('with header', () => {
			const header = <h1>Some Header</h1>;

			const footer = <p>Some Footer</p>;

			const h = harness(() => <Card header={header} footer={footer} />);
			h.expect(() => expected({ header: header, footer: footer }));
		});

		test('with title', () => {
			const footer = <p>Some Footer</p>;

			const h = harness(() => <Card title="foo" image={{ src: 'somewhere' }} footer={footer} />);
			h.expect(() => expected({ header: [<img src="somewhere" />, 'foo'], footer: footer }));
		});

		test('with title and image', () => {
			const footer = <p>Some Footer</p>;

			const h = harness(() => <Card title="foo" footer={footer} />);
			h.expect(() => expected({ header: 'foo', footer: footer }));
		});
	});

	it('renders children', () => {
		const h = harness(() => (
			<Card>
				<span>foo</span>
			</Card>
		));
		h.expect(() => expected({}, <span>foo</span>));
	});
});
