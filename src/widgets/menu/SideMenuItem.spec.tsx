import { tsx } from '@dojo/framework/core/vdom';
import ActiveLink from '@dojo/framework/routing/ActiveLink';
import assertionTemplate from '@dojo/framework/testing/assertionTemplate';
import harness from '@dojo/framework/testing/harness';

import FontAwesomeIcon from '../icon/FontAwesomeIcon';

import * as css from './SideMenuItem.m.css';
import SideMenuItem from './SideMenuItem';

describe('Side Menu Item', () => {
	const baseAssertion = assertionTemplate(() => (
		<li key="menu-item" classes={css.root}>
			<ActiveLink key="link" to="outlet" params={undefined} classes={[css.link]} activeClasses={[css.selected]}>
				A link
			</ActiveLink>
		</li>
	));

	describe('outlet link', () => {
		it('renders', () => {
			const h = harness(() => <SideMenuItem to="outlet">A link</SideMenuItem>);

			h.expect(baseAssertion);
		});

		it('renders with link parameters', () => {
			const h = harness(() => (
				<SideMenuItem to="outlet" params={{ key: 'value' }}>
					A link
				</SideMenuItem>
			));

			const assertion = baseAssertion.setProperty('@link', 'params', { key: 'value' });
			h.expect(assertion);
		});

		it('renders inverse selected', () => {
			const h = harness(() => (
				<SideMenuItem to="outlet" inverse>
					A link
				</SideMenuItem>
			));

			const assertion = baseAssertion
				.setProperty('@link', 'activeClasses', [css.selected])
				.setProperty('@link', 'classes', [css.link, css.inverse]);
			h.expect(assertion);
		});
	});

	describe('external link', () => {
		it('renders', () => {
			const h = harness(() => <SideMenuItem to="https://example.com/">A link</SideMenuItem>);

			const assertion = baseAssertion.setChildren('@menu-item', [
				<a key="link" href="https://example.com/" target="_blank" classes={css.link}>
					A link
				</a>
			]);
			h.expect(assertion);
		});
	});

	describe('dropdown link', () => {
		const baseDropdownAssertion = assertionTemplate(() => (
			<li key="menu-item" classes={css.root}>
				<button key="link" classes={[css.link, css.dropdownLink]} onclick={() => {}}>
					<FontAwesomeIcon
						key="toggleIcon"
						icon="chevron-right"
						classes={{ 'dojo.io/FontAwesomeIcon': { root: [css.dropdownIcon] } }}
					/>
				</button>
				<div assertion-key="children" classes={[css.children, css.collapsed]}>
					Dropdown children
				</div>
			</li>
		));

		it('renders', () => {
			const h = harness(() => <SideMenuItem name="A link">Dropdown children</SideMenuItem>);

			const initialAssertion = baseDropdownAssertion.prepend('@link', ['A link']);

			h.expect(initialAssertion);

			h.trigger('@link', 'onclick');

			const openAssertion = initialAssertion
				.setProperty('@toggleIcon', 'icon', 'chevron-down')
				.setProperty('~children', 'classes', [css.children, css.expanded]);

			h.expect(openAssertion);

			h.trigger('@link', 'onclick');

			h.expect(initialAssertion);
		});

		it('renders without name', () => {
			const h = harness(() => <SideMenuItem>Dropdown children</SideMenuItem>);

			h.expect(baseDropdownAssertion);
		});

		it('renders active', () => {
			window.history.pushState({}, 'Test Title', '/a-link/anything-else');

			const h = harness(() => <SideMenuItem name="A link">Dropdown children</SideMenuItem>);

			const assertion = baseDropdownAssertion
				.prepend('@link', ['A link'])
				.setProperty('@link', 'classes', [css.link, css.dropdownLink, css.selected]);

			h.expect(assertion);
		});

		it('renders inverse active', () => {
			window.history.pushState({}, 'Test Title', '/a-link/anything-else');

			const h = harness(() => (
				<SideMenuItem name="A link" inverse>
					Dropdown children
				</SideMenuItem>
			));

			const assertion = baseDropdownAssertion
				.prepend('@link', ['A link'])
				.setProperty('@link', 'classes', [css.link, css.dropdownLink, css.selected, css.inverse]);

			h.expect(assertion);
		});
	});
});
