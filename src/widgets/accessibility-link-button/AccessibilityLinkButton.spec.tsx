import harness from '@dojo/framework/testing/harness';
import assertionTemplate from '@dojo/framework/testing/assertionTemplate';
import { tsx } from '@dojo/framework/core/vdom';
import Link from '@dojo/framework/routing/Link';

import AccessibilityLinkButton from './AccessibilityLinkButton';
import * as css from './AccessibilityLinkButton.m.css';

describe('AccessibilityLinkButton', () => {
	describe('Link', () => {
		const linkAssertion = assertionTemplate(() => (
			<Link key={undefined} disabled={false} classes={css.root} to="outlet">
				Some content
			</Link>
		));

		it('should render', () => {
			const h = harness(() => (
				<AccessibilityLinkButton linkProperties={{ to: 'outlet' }}>Some content</AccessibilityLinkButton>
			));
			h.expect(linkAssertion);
		});

		const allInAssertion = assertionTemplate(() => (
			<Link
				key="link"
				disabled
				classes={css.root}
				routerKey="routerKey"
				isOutlet
				params={{ key: 'value' }}
				onClick={() => {}}
				to="outlet"
			>
				Some content
			</Link>
		));

		it('should pass parameters to link and badge', () => {
			const h = harness(() => (
				<AccessibilityLinkButton
					key="link"
					disabled
					linkProperties={{
						to: 'outlet',
						routerKey: 'routerKey',
						isOutlet: true,
						params: { key: 'value' },
						onClick: () => {}
					}}
				>
					Some content
				</AccessibilityLinkButton>
			));
			h.expect(allInAssertion);
		});
	});

	describe('External Link', () => {
		const linkAssertion = assertionTemplate(() => (
			<a key="undefined" disabled={false} classes={css.root} href="https://example.com">
				Some content
			</a>
		));

		it('should render', () => {
			const h = harness(() => (
				<AccessibilityLinkButton href="https://example.com">Some content</AccessibilityLinkButton>
			));
			h.expect(linkAssertion);
		});

		const allInAssertion = assertionTemplate(() => (
			<a key="link" disabled classes={css.root} href="https://example.com">
				Some content
			</a>
		));

		it('should pass parameters to link and badge', () => {
			const h = harness(() => (
				<AccessibilityLinkButton key="link" disabled href="https://example.com">
					Some content
				</AccessibilityLinkButton>
			));
			h.expect(allInAssertion);
		});
	});

	describe('Button', () => {
		const buttonAssertion = assertionTemplate(() => (
			<button key="button" disabled={false} onclick={() => {}} type="button" classes={css.root}>
				Some content
			</button>
		));

		it('should render', () => {
			const h = harness(() => (
				<AccessibilityLinkButton key="button" onClick={() => {}}>
					Some content
				</AccessibilityLinkButton>
			));
			h.expect(buttonAssertion);
		});

		const allInAssertion = assertionTemplate(() => (
			<button key="button" disabled onclick={() => {}} type="button" classes={css.root}>
				Some content
			</button>
		));

		it('should pass parameters to link and badge', () => {
			const onClick = jest.fn();
			const h = harness(() => (
				<AccessibilityLinkButton key="button" disabled onClick={onClick}>
					Some content
				</AccessibilityLinkButton>
			));
			h.expect(allInAssertion);

			h.trigger('@button', 'onclick');

			expect(onClick).toHaveBeenCalled();
		});
	});
});
