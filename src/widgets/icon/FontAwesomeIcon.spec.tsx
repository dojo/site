import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';

import * as fontawesome from '@fortawesome/fontawesome-svg-core';
import FontAwesomeIcon, { IconSize, abstractElementToVNode, objectWithKey } from './FontAwesomeIcon';
import { faCoffee, faCircle } from '@fortawesome/free-solid-svg-icons';
import * as fontawesomeCore from '@fortawesome/fontawesome-svg-core';

import * as css from './FontAwesomeIcon.m.css';

fontawesome.library.add(faCoffee, faCircle);

interface ExpectedParams {
	extraClasses?: string[];
	iconParams?: fontawesomeCore.IconParams;
	widthClass?: string;
	useAbstractElementToVNode?: boolean;
}

const mockAbstractElement: fontawesomeCore.AbstractElement = {
	tag: 'svg',
	attributes: {
		'aria-hidden': 'true',
		'data-prefix': 'fas',
		'data-icon': 'coffee',
		class: 'svg-inline--fa fa-coffee fa-w-20',
		role: 'img',
		xmlns: 'http://www.w3.org/2000/svg',
		viewBox: '0 0 640 512',
		style: 'transform-origin: 0.375em 0.5em;'
	},
	children: [
		{
			tag: 'g',
			attributes: {
				transform: 'translate(320 256)'
			},
			children: [
				{
					tag: 'g',
					attributes: {
						transform: 'translate(-128, 0)  scale(2.5, 2.5)  rotate(15 0 0)'
					},
					children: [
						{
							tag: 'path',
							children: undefined,
							attributes: {
								fill: 'currentColor',
								d:
									'M192 384h192c53 0 96-43 96-96h32c70.6 0 128-57.4 128-128S582.6 32 512 32H120c-13.3 0-24 10.7-24 24v232c0 53 43 96 96 96zM512 96c35.3 0 64 28.7 64 64s-28.7 64-64 64h-32V96h32zm47.7 384H48.3c-47.6 0-61-64-36-64h583.3c25 0 11.8 64-35.9 64z',
								transform: 'translate(-320 -256)'
							}
						}
					]
				}
			]
		}
	]
};

const mockTSX = (
	<svg
		aria-hidden="true"
		data-prefix="fas"
		data-icon="coffee"
		class="svg-inline--fa fa-coffee fa-w-20"
		role="img"
		classes={['svg-inline--fa', 'fa-coffee', 'fa-w-20', css.root]}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 640 512"
		style="transform-origin: 0.375em 0.5em;"
	>
		<g transform="translate(320 256)">
			<g transform="translate(-128, 0)  scale(2.5, 2.5)  rotate(15 0 0)">
				<path
					fill="currentColor"
					transform="translate(-320 -256)"
					d="M192 384h192c53 0 96-43 96-96h32c70.6 0 128-57.4 128-128S582.6 32 512 32H120c-13.3 0-24 10.7-24 24v232c0 53 43 96 96 96zM512 96c35.3 0 64 28.7 64 64s-28.7 64-64 64h-32V96h32zm47.7 384H48.3c-47.6 0-61-64-36-64h583.3c25 0 11.8 64-35.9 64z"
				/>
			</g>
		</g>
	</svg>
);

describe('FontAwesomeIcon', () => {
	function expected(iconLookup: fontawesomeCore.IconLookup, params: ExpectedParams = {}, print = false) {
		const {
			extraClasses = [],
			iconParams = undefined,
			widthClass = 'fa-w-20',
			useAbstractElementToVNode = false
		} = params;

		const renderedIcon = fontawesomeCore.icon(iconLookup, iconParams);
		if (!renderedIcon) {
			return null;
		}

		const classes = ['svg-inline--fa', `fa-${iconLookup.iconName}`, widthClass, ...extraClasses];
		const viewBox = [0, 0, renderedIcon.icon[0], renderedIcon.icon[1]].join(' ');

		return useAbstractElementToVNode
			? renderedIcon.abstract.map((element) => abstractElementToVNode(element, css.root))
			: [
					<svg
						aria-hidden="true"
						data-prefix={iconLookup.prefix}
						data-icon={iconLookup.iconName}
						focusable="false"
						class={classes.join(' ')}
						classes={[...classes, css.root]}
						viewBox={viewBox}
						role="img"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path fill="currentColor" d={renderedIcon.icon[4]} />
					</svg>
			  ];
	}

	test('abstractElementToVNode', () => {
		expect(abstractElementToVNode(mockAbstractElement, css.root)).toEqual(mockTSX);
	});

	describe('objectWithKey', () => {
		test('empty array value', () => {
			expect(objectWithKey('key', [])).toEqual({});
		});

		test('filled array value', () => {
			expect(objectWithKey('key', ['something'])).toEqual({ key: ['something'] });
		});

		test('undefined value', () => {
			expect(objectWithKey('key', undefined)).toEqual({});
		});

		test('object value', () => {
			expect(objectWithKey('key', { something: 'somethingElse' })).toEqual({
				key: { something: 'somethingElse' }
			});
		});

		test('number value', () => {
			expect(objectWithKey('key', 12345)).toEqual({ key: 12345 });
		});

		test('string value', () => {
			expect(objectWithKey('key', 'somethingElse')).toEqual({ key: 'somethingElse' });
		});
	});

	it('renders using pack and name', () => {
		const h = harness(() => <FontAwesomeIcon icon={['fas', 'coffee']} />);

		h.expect(() => expected({ prefix: 'fas', iconName: 'coffee' }));
	});

	it('renders using pack common names', () => {
		const h = harness(() => <FontAwesomeIcon icon="coffee" />);

		h.expect(() => expected({ prefix: 'fas', iconName: 'coffee' }));
	});

	it('does not render when using pack common names not added to library', () => {
		const h = harness(() => <FontAwesomeIcon icon="spinner" />);

		h.expect(() => null);
	});

	test('using icon', () => {
		const h = harness(() => <FontAwesomeIcon icon={faCoffee} />);

		h.expect(() => expected({ prefix: 'fas', iconName: 'coffee' }));
	});

	test('using border', () => {
		const h = harness(() => <FontAwesomeIcon icon={faCoffee} border />);

		h.expect(() => expected({ prefix: 'fas', iconName: 'coffee' }, { extraClasses: ['fa-border'] }));
	});

	test('using fixedWidth', () => {
		const h = harness(() => <FontAwesomeIcon icon={faCoffee} fixedWidth />);

		h.expect(() => expected({ prefix: 'fas', iconName: 'coffee' }, { extraClasses: ['fa-fw'] }));
	});

	test('using inverse', () => {
		const h = harness(() => <FontAwesomeIcon icon={faCoffee} inverse />);

		h.expect(() => expected({ prefix: 'fas', iconName: 'coffee' }, { extraClasses: ['fa-inverse'] }));
	});

	describe('using flip', () => {
		test('horizontal', () => {
			const h = harness(() => <FontAwesomeIcon icon={faCoffee} flip="horizontal" />);

			h.expect(() => expected({ prefix: 'fas', iconName: 'coffee' }, { extraClasses: ['fa-flip-horizontal'] }));
		});

		test('vertical', () => {
			const h = harness(() => <FontAwesomeIcon icon={faCoffee} flip="vertical" />);

			h.expect(() => expected({ prefix: 'fas', iconName: 'coffee' }, { extraClasses: ['fa-flip-vertical'] }));
		});

		test('both', () => {
			const h = harness(() => <FontAwesomeIcon icon={faCoffee} flip="both" />);

			h.expect(() =>
				expected(
					{ prefix: 'fas', iconName: 'coffee' },
					{ extraClasses: ['fa-flip-horizontal', 'fa-flip-vertical'] }
				)
			);
		});
	});

	test('using listItem', () => {
		const h = harness(() => <FontAwesomeIcon icon={faCoffee} listItem />);

		h.expect(() => expected({ prefix: 'fas', iconName: 'coffee' }, { extraClasses: ['fa-li'] }));
	});

	describe('using pull', () => {
		test('right', () => {
			const h = harness(() => <FontAwesomeIcon icon={faCoffee} pull="right" />);

			h.expect(() => expected({ prefix: 'fas', iconName: 'coffee' }, { extraClasses: ['fa-pull-right'] }));
		});

		test('left', () => {
			const h = harness(() => <FontAwesomeIcon icon={faCoffee} pull="left" />);

			h.expect(() => expected({ prefix: 'fas', iconName: 'coffee' }, { extraClasses: ['fa-pull-left'] }));
		});
	});

	test('using pulse', () => {
		const h = harness(() => <FontAwesomeIcon icon={faCoffee} pulse />);

		h.expect(() => expected({ prefix: 'fas', iconName: 'coffee' }, { extraClasses: ['fa-pulse'] }));
	});

	describe('using rotation', () => {
		test('90', () => {
			const h = harness(() => <FontAwesomeIcon icon={faCoffee} rotation={90} />);

			h.expect(() => expected({ prefix: 'fas', iconName: 'coffee' }, { extraClasses: ['fa-rotate-90'] }));
		});

		test('180', () => {
			const h = harness(() => <FontAwesomeIcon icon={faCoffee} rotation={180} />);

			h.expect(() => expected({ prefix: 'fas', iconName: 'coffee' }, { extraClasses: ['fa-rotate-180'] }));
		});

		test('270', () => {
			const h = harness(() => <FontAwesomeIcon icon={faCoffee} rotation={270} />);

			h.expect(() => expected({ prefix: 'fas', iconName: 'coffee' }, { extraClasses: ['fa-rotate-270'] }));
		});
	});

	test('using size', () => {
		(['lg', 'xs', 'sm', '1x', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x'] as IconSize[]).forEach(
			(size) => {
				const h = harness(() => <FontAwesomeIcon icon={faCoffee} size={size} />);

				h.expect(() => expected({ prefix: 'fas', iconName: 'coffee' }, { extraClasses: [`fa-${size}`] }));
			}
		);
	});

	describe('using spin', () => {
		test('setting spin prop to true adds fa-spin class', () => {
			const h = harness(() => <FontAwesomeIcon icon={faCoffee} spin />);

			h.expect(() => expected({ prefix: 'fas', iconName: 'coffee' }, { extraClasses: [`fa-spin`] }));
		});

		test('setting spin prop to false after setting it to true results in no fa-spin class', () => {
			let spin = true;
			const h = harness(() => <FontAwesomeIcon icon={faCoffee} spin={spin} />);

			h.expect(() => expected({ prefix: 'fas', iconName: 'coffee' }, { extraClasses: [`fa-spin`] }));

			spin = false;
			h.expect(() => expected({ prefix: 'fas', iconName: 'coffee' }));
		});
	});

	describe('using transform', () => {
		test('string', () => {
			const h = harness(() => <FontAwesomeIcon icon={faCoffee} transform="grow-40 left-4 rotate-15" />);

			h.expect(() =>
				expected(
					{ prefix: 'fas', iconName: 'coffee' },
					{
						iconParams: {
							transform: {
								size: 56, // Default is 16
								x: -4,
								rotate: 15
							}
						},
						useAbstractElementToVNode: true
					}
				)
			);
		});

		test('object', () => {
			const h = harness(() => (
				<FontAwesomeIcon
					icon={faCoffee}
					transform={{
						flipX: false,
						flipY: false,
						rotate: 15,
						size: 56,
						x: -4,
						y: 0
					}}
				/>
			));

			h.expect(() =>
				expected(
					{ prefix: 'fas', iconName: 'coffee' },
					{
						iconParams: {
							transform: {
								size: 56,
								x: -4,
								rotate: 15
							}
						},
						useAbstractElementToVNode: true
					}
				)
			);
		});
	});

	describe('mask', () => {
		test('will add icon', () => {
			const h = harness(() => <FontAwesomeIcon icon={faCoffee} mask={faCircle} />);

			expect((h.getRender(0) as any)[0].children.length).toBe(2);
			expect((h.getRender(0) as any)[0].children[1].properties.hasOwnProperty('clip-path')).toBeTruthy();
		});
	});

	describe('symbol', () => {
		const spy = jest.spyOn(fontawesome, 'icon');

		afterEach(() => {
			spy.mockClear();
		});

		test('will not create a symbol', () => {
			harness(() => <FontAwesomeIcon icon={faCoffee} />);

			expect(spy.mock.calls[0][1]).toHaveProperty('symbol', false);
		});

		test('will create a symbol', () => {
			harness(() => <FontAwesomeIcon icon={faCoffee} symbol="coffee-icon" />);

			expect(spy.mock.calls[0][1]).toHaveProperty('symbol', 'coffee-icon');
		});
	});

	describe('title', () => {
		test('will not add a title element', () => {
			const h = harness(() => <FontAwesomeIcon icon={faCoffee} />);

			h.expect(() => expected({ prefix: 'fas', iconName: 'coffee' }));
		});

		test('will add a title element', () => {
			const h = harness(() => <FontAwesomeIcon icon={faCoffee} title="Coffee" />);

			expect((h.getRender(0) as any)[0].children.length).toBe(2);
			expect((h.getRender(0) as any)[0].children[0].children.length).toBe(1);
			expect((h.getRender(0) as any)[0].children[0].children[0]).toBe('Coffee');
		});
	});
});
