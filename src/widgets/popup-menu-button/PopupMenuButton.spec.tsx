import assertionTemplate from '@dojo/framework/testing/assertionTemplate';
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';
import Dimensions from '@dojo/framework/core/meta/Dimensions';

import PopupMenu, { PopupMenuItem, PopupMenuPositioning } from '../popup-menu/PopupMenu';

import { MockMetaMixin } from '../../test/util/MockMeta';

import PopupMenuButton, { PopupMenuPosition } from './PopupMenuButton';
import * as css from './PopupMenuButton.m.css';

describe('PopupMenuButton', () => {
	const noop = function() {};
	let items: PopupMenuItem[];

	let itemClick = jest.fn();
	let MockPopupMenuButton: typeof PopupMenuButton;

	const baseAssertion = assertionTemplate(() => (
		<div classes={css.root}>
			<div key="buttonWrapper">
				<button classes={css.button} key="popupMenuButton" onclick={noop}>
					Button
				</button>
			</div>
		</div>
	));

	const popupMenu = (
		position: PopupMenuPositioning = {
			right: 0,
			top: 24
		}
	) => (
		<PopupMenu
			key="popupMenu"
			position={position}
			onFocus={noop}
			onBlur={noop}
			items={[
				{
					title: 'foo',
					onClick: () => {}
				}
			]}
		/>
	);

	beforeEach(() => {
		jest.useFakeTimers();

		const mockMetaMixin = new MockMetaMixin(PopupMenuButton);

		mockMetaMixin.registerMetaCall(Dimensions, 'get', ['buttonWrapper'], {
			size: {
				width: 100,
				height: 24
			}
		});

		MockPopupMenuButton = mockMetaMixin.getClass();

		itemClick = jest.fn();
		items = [
			{
				title: 'foo',
				onClick: itemClick
			}
		];
	});

	it('default renders correctly open', () => {
		const h = harness(() => <MockPopupMenuButton items={[]}>Button</MockPopupMenuButton>);
		h.expect(baseAssertion);
	});

	it('toggles on click', () => {
		const h = harness(() => <MockPopupMenuButton items={items}>Button</MockPopupMenuButton>);

		h.trigger('@popupMenuButton', 'onclick');

		const assertion = baseAssertion.append(':root', () => [popupMenu()]);
		h.expect(assertion);
		h.trigger('@popupMenu', 'onFocus');

		// Click should do nothing, but the removal of focus does
		h.trigger('@popupMenuButton', 'onclick');

		h.expect(assertion);

		h.trigger('@popupMenu', 'onBlur');
		h.expect(baseAssertion);

		// Instally clicking again does not open the menu until after a 250ms timeout (after onBlur) to prevent the popup menu from flashing closed then opened
		h.trigger('@popupMenuButton', 'onclick');
		h.expect(baseAssertion);

		jest.runAllTimers();

		h.trigger('@popupMenuButton', 'onclick');
		h.expect(assertion);
	});

	it('closes popup on blur', () => {
		const h = harness(() => <MockPopupMenuButton items={items}>Button</MockPopupMenuButton>);

		h.trigger('@popupMenuButton', 'onclick');
		h.trigger('@popupMenu', 'onBlur');

		h.expect(baseAssertion);
	});

	it('closes popup on menu item click', () => {
		const h = harness(() => <MockPopupMenuButton items={items}>Button</MockPopupMenuButton>);

		h.trigger('@popupMenuButton', 'onclick');
		h.trigger('@popupMenu', (node) => {
			return (node.properties as any).items[0].onClick;
		});

		expect(itemClick).toHaveBeenCalled();
		h.expect(baseAssertion);
	});

	describe('positions', () => {
		const testPosition = (positionName: PopupMenuPosition, position: PopupMenuPositioning) => {
			const h = harness(() => (
				<MockPopupMenuButton position={positionName} items={items}>
					Button
				</MockPopupMenuButton>
			));

			h.trigger('@popupMenuButton', 'onclick');

			const assertion = baseAssertion.append(':root', () => [popupMenu(position)]);
			h.expect(assertion);
		};

		test('top-left', () =>
			testPosition('top-left', {
				left: 0,
				top: 24
			}));

		test('top-right', () =>
			testPosition('top-right', {
				right: 0,
				top: 24
			}));

		test('left-top', () =>
			testPosition('left-top', {
				left: 100,
				top: 0
			}));

		test('left-bottom', () =>
			testPosition('left-bottom', {
				left: 100,
				bottom: 0
			}));

		test('right-top', () =>
			testPosition('right-top', {
				right: 100,
				top: 0
			}));

		test('right-bottom', () =>
			testPosition('right-bottom', {
				right: 100,
				bottom: 0
			}));

		test('bottom-left', () =>
			testPosition('bottom-left', {
				left: 0,
				bottom: 24
			}));

		test('bottom-right', () =>
			testPosition('bottom-right', {
				right: 0,
				bottom: 24
			}));
	});
});
