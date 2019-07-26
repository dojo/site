import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';

import FontAwesomeIcon, { IconSize } from '../FontAwesomeIcon';

import * as css from '../FontAwesomeIcon.m.css';
import assertionTemplate from '@dojo/framework/testing/assertionTemplate';

describe('FontAwesomeIcon', () => {
	const baseClasses = [css.root, 'fas'];
	const baseAssertion = assertionTemplate(() => <i title={undefined} classes={[css.root, 'fas', 'fa-coffee']} />);

	it('renders using pack and name', () => {
		const h = harness(() => <FontAwesomeIcon icon={['fas', 'coffee']} />);

		h.expect(baseAssertion);
	});

	it('renders using pack common names', () => {
		const h = harness(() => <FontAwesomeIcon icon="coffee" />);

		h.expect(baseAssertion);
	});

	it('renders using lookup', () => {
		const h = harness(() => <FontAwesomeIcon icon={{ prefix: 'fas', iconName: 'coffee' }} />);

		h.expect(baseAssertion);
	});

	test('using border', () => {
		const h = harness(() => <FontAwesomeIcon icon="coffee" border />);

		h.expect(baseAssertion.setProperty(':root', 'classes', [...baseClasses, 'fa-border', 'fa-coffee']));
	});

	test('using fixedWidth', () => {
		const h = harness(() => <FontAwesomeIcon icon="coffee" fixedWidth />);

		h.expect(baseAssertion.setProperty(':root', 'classes', [...baseClasses, 'fa-fw', 'fa-coffee']));
	});

	test('using inverse', () => {
		const h = harness(() => <FontAwesomeIcon icon="coffee" inverse />);

		h.expect(baseAssertion.setProperty(':root', 'classes', [...baseClasses, 'fa-inverse', 'fa-coffee']));
	});

	describe('using flip', () => {
		test('horizontal', () => {
			const h = harness(() => <FontAwesomeIcon icon="coffee" flip="horizontal" />);

			h.expect(
				baseAssertion.setProperty(':root', 'classes', [...baseClasses, 'fa-flip-horizontal', 'fa-coffee'])
			);
		});

		test('vertical', () => {
			const h = harness(() => <FontAwesomeIcon icon="coffee" flip="vertical" />);

			h.expect(baseAssertion.setProperty(':root', 'classes', [...baseClasses, 'fa-flip-vertical', 'fa-coffee']));
		});

		test('both', () => {
			const h = harness(() => <FontAwesomeIcon icon="coffee" flip="both" />);

			h.expect(
				baseAssertion.setProperty(':root', 'classes', [
					...baseClasses,
					'fa-flip-horizontal',
					'fa-flip-vertical',
					'fa-coffee'
				])
			);
		});
	});

	test('using listItem', () => {
		const h = harness(() => <FontAwesomeIcon icon="coffee" listItem />);

		h.expect(baseAssertion.setProperty(':root', 'classes', [...baseClasses, 'fa-li', 'fa-coffee']));
	});

	describe('using pull', () => {
		test('right', () => {
			const h = harness(() => <FontAwesomeIcon icon="coffee" pull="right" />);

			h.expect(baseAssertion.setProperty(':root', 'classes', [...baseClasses, 'fa-pull-right', 'fa-coffee']));
		});

		test('left', () => {
			const h = harness(() => <FontAwesomeIcon icon="coffee" pull="left" />);

			h.expect(baseAssertion.setProperty(':root', 'classes', [...baseClasses, 'fa-pull-left', 'fa-coffee']));
		});
	});

	test('using pulse', () => {
		const h = harness(() => <FontAwesomeIcon icon="coffee" pulse />);

		h.expect(baseAssertion.setProperty(':root', 'classes', [...baseClasses, 'fa-pulse', 'fa-coffee']));
	});

	describe('using rotation', () => {
		test('90', () => {
			const h = harness(() => <FontAwesomeIcon icon="coffee" rotation={90} />);

			h.expect(baseAssertion.setProperty(':root', 'classes', [...baseClasses, 'fa-rotate-90', 'fa-coffee']));
		});

		test('180', () => {
			const h = harness(() => <FontAwesomeIcon icon="coffee" rotation={180} />);

			h.expect(baseAssertion.setProperty(':root', 'classes', [...baseClasses, 'fa-rotate-180', 'fa-coffee']));
		});

		test('270', () => {
			const h = harness(() => <FontAwesomeIcon icon="coffee" rotation={270} />);

			h.expect(baseAssertion.setProperty(':root', 'classes', [...baseClasses, 'fa-rotate-270', 'fa-coffee']));
		});
	});

	test('using size', () => {
		(['lg', 'xs', 'sm', '1x', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x'] as IconSize[]).forEach(
			(size) => {
				const h = harness(() => <FontAwesomeIcon icon="coffee" size={size} />);

				h.expect(baseAssertion.setProperty(':root', 'classes', [...baseClasses, `fa-${size}`, 'fa-coffee']));
			}
		);
	});

	describe('using spin', () => {
		test('setting spin prop to true adds fa-spin class', () => {
			const h = harness(() => <FontAwesomeIcon icon="coffee" spin />);

			h.expect(baseAssertion.setProperty(':root', 'classes', [...baseClasses, 'fa-spin', 'fa-coffee']));
		});

		test('setting spin prop to false after setting it to true results in no fa-spin class', () => {
			let spin = true;
			const h = harness(() => <FontAwesomeIcon icon="coffee" spin={spin} />);

			h.expect(baseAssertion.setProperty(':root', 'classes', [...baseClasses, 'fa-spin', 'fa-coffee']));

			spin = false;
			h.expect(baseAssertion);
		});
	});

	describe('title', () => {
		test('will add a title element', () => {
			const h = harness(() => <FontAwesomeIcon icon="coffee" title="A Title" />);

			h.expect(baseAssertion.setProperty(':root', 'title', 'A Title'));
		});
	});
});
