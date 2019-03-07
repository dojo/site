import { tsx } from '@dojo/framework/widget-core/tsx';
import ActiveLink from '@dojo/framework/routing/ActiveLink';
import assertionTemplate from '@dojo/framework/testing/assertionTemplate';
import harness from '@dojo/framework/testing/harness';

import * as css from './SideMenuItem.m.css';
import SideMenuItem from './SideMenuItem';

describe('Side Menu Item', () => {
	const baseAssertion = assertionTemplate(() => (
		<li key="menu-item">
			<ActiveLink
				{...{ '~key': 'link' }}
				to="outlet"
				params={undefined}
				classes={css.root}
				activeClasses={[css.selected]}
			>
				A link
			</ActiveLink>
		</li>
	));

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

		const assertion = baseAssertion.setProperty('~link', 'params', { key: 'value' });
		h.expect(assertion);
	});

	it('renders absolute link', () => {
		const h = harness(() => <SideMenuItem to="https://example.com/">A link</SideMenuItem>);

		const assertion = baseAssertion.setChildren('@menu-item', [
			<a href="https://example.com/" target="_blank" classes={css.root}>
				A link
			</a>
		]);
		h.expect(assertion);
	});
});
