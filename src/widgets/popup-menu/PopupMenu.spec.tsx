import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';
import assertionTemplate from '@dojo/framework/testing/assertionTemplate';
import Focus from '@dojo/framework/core/meta/Focus';

import AccessibilityLinkButton from '../accessibility-link-button/AccessibilityLinkButton';

import { MockMetaMixin } from '../../test/util/MockMeta';

import PopupMenu from './PopupMenu';
import * as css from './PopupMenu.m.css';

describe('PopupMenu', () => {
	const noop = function() {};

	const baseAssertionTemplate = assertionTemplate(() => (
		<div
			key="popupMenu"
			classes={[css.root]}
			tabindex="-1"
			focus={true}
			styles={{
				top: undefined,
				right: undefined,
				left: undefined,
				bottom: undefined
			}}
		/>
	));

	it('renders with a default position', () => {
		const h = harness(() => <PopupMenu items={[]} />);
		h.expect(baseAssertionTemplate);
	});

	it('renders with a specific position, and supports partial positions', () => {
		const noPositionClass = baseAssertionTemplate.setProperty(':root', 'classes', [css.root]);

		[
			{
				top: 100,
				expected: { top: '100px', right: undefined, left: undefined, bottom: undefined }
			},
			{
				right: 100,
				expected: { top: undefined, right: '100px', left: undefined, bottom: undefined }
			},
			{
				top: 200,
				right: 200,
				expected: { top: '200px', right: '200px', left: undefined, bottom: undefined }
			},
			{
				top: 200,
				left: 200,
				expected: { top: '200px', right: undefined, left: '200px', bottom: undefined }
			},
			{
				left: 100,
				expected: { top: undefined, right: undefined, left: '100px', bottom: undefined }
			},
			{
				bottom: 100,
				expected: { top: undefined, right: undefined, left: undefined, bottom: '100px' }
			},
			{
				left: 200,
				bottom: 200,
				expected: { top: undefined, right: undefined, left: '200px', bottom: '200px' }
			},
			{
				right: 200,
				bottom: 200,
				expected: { top: undefined, right: '200px', left: undefined, bottom: '200px' }
			}
		].forEach(({ top, right, left, bottom, expected }) => {
			const h = harness(() => <PopupMenu items={[]} position={{ top, right, left, bottom }} />);
			h.expect(noPositionClass.setProperty(':root', 'styles', expected));
		});
	});

	it('renders menu items', () => {
		const h = harness(() => (
			<PopupMenu
				items={[
					{
						title: 'section',
						sectionHeader: true
					},
					{
						title: 'foo',
						onClick: noop
					},
					{
						title: <div>test</div>,
						linkProperties: {
							to: 'someOutlet'
						}
					}
				]}
			/>
		));

		const assertion = baseAssertionTemplate.setChildren(':root', () => [
			<div classes={css.sectionHeader}>section</div>,
			<AccessibilityLinkButton
				classes={{ 'dojo.io/AccessibilityLinkButton': { root: [css.item] } }}
				onClick={noop}
				href={undefined}
				linkProperties={undefined}
			>
				foo
			</AccessibilityLinkButton>,
			<AccessibilityLinkButton
				classes={{ 'dojo.io/AccessibilityLinkButton': { root: [css.item] } }}
				onClick={noop}
				href={undefined}
				linkProperties={{
					to: 'someOutlet',
					onClick: noop
				}}
			>
				<div>test</div>
			</AccessibilityLinkButton>
		]);

		h.expect(assertion);
	});

	it('clicks items', () => {
		const onBlur = jest.fn();
		const onButtonClick = jest.fn();
		const onLinkClick = jest.fn();
		const h = harness(() => (
			<PopupMenu
				onBlur={onBlur}
				items={[
					{
						title: 'foo',
						onClick: onButtonClick
					},
					{
						title: <div>test</div>,
						linkProperties: {
							to: 'someOutlet',
							onClick: onLinkClick
						}
					}
				]}
			/>
		));

		const assertion = baseAssertionTemplate.setChildren(':root', () => [
			<AccessibilityLinkButton
				classes={{ 'dojo.io/AccessibilityLinkButton': { root: [css.item] } }}
				onClick={noop}
				href={undefined}
				linkProperties={undefined}
			>
				foo
			</AccessibilityLinkButton>,
			<AccessibilityLinkButton
				classes={{ 'dojo.io/AccessibilityLinkButton': { root: [css.item] } }}
				onClick={noop}
				href={undefined}
				linkProperties={{
					to: 'someOutlet',
					onClick: noop
				}}
			>
				<div>test</div>
			</AccessibilityLinkButton>
		]);

		h.expect(assertion);

		h.trigger(':root', (node) => (node as any).children[0].properties.onClick);
		expect(onButtonClick).toHaveBeenCalled();
		h.expect(assertion);
		expect(onBlur).toHaveBeenCalledTimes(1);

		h.trigger(':root', (node) => (node as any).children[1].properties.linkProperties.onClick);
		expect(onLinkClick).toHaveBeenCalled();
		h.expect(assertion);
		expect(onBlur).toHaveBeenCalledTimes(2);
	});

	describe('focus', () => {
		it('calls onFocus when menu in focus', () => {
			const onFocus = jest.fn();

			const mockMetaMixin = new MockMetaMixin(PopupMenu);

			mockMetaMixin.registerMetaCallOnce(Focus, 'get', ['popupMenu'], {
				active: false,
				containsFocus: true
			});

			const MockPopupMenu = mockMetaMixin.getClass();

			const h = harness(() => <MockPopupMenu items={[]} onFocus={onFocus} />);
			h.expect(baseAssertionTemplate);

			expect(onFocus).toHaveBeenCalled();
		});

		it('calls onBlur when menu goes out of focus', () => {
			jest.useFakeTimers();
			const onBlur = jest.fn();

			const mockMetaMixin = new MockMetaMixin(PopupMenu);

			mockMetaMixin.registerMetaCallOnce(
				Focus,
				'get',
				['popupMenu'],
				{
					active: false,
					containsFocus: true
				},
				{
					value: {
						active: false,
						containsFocus: true
					},
					shouldInvalidate: true
				},
				{
					value: {
						active: false,
						containsFocus: false
					},
					shouldInvalidate: true
				}
			);

			const MockPopupMenu = mockMetaMixin.getClass();

			const h = harness(() => <MockPopupMenu items={[]} onBlur={onBlur} />);
			h.expect(baseAssertionTemplate);

			jest.runAllTimers();
			h.expect(baseAssertionTemplate);

			jest.runAllTimers();
			h.expect(baseAssertionTemplate);

			expect(onBlur).toHaveBeenCalled();
		});
	});
});
