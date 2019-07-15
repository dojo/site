import { tsx } from '@dojo/framework/core/vdom';
import assertionTemplate from '@dojo/framework/testing/assertionTemplate';
import harness from '@dojo/framework/testing/harness';

import SideMenuItemList from '../SideMenuItemList';

import * as css from '../SideMenuSection.m.css';
import SideMenuSection from '../SideMenuSection';

describe('Side Menu Section', () => {
	const baseAssertion = assertionTemplate(() => (
		<div key="menu-section" classes={[css.root, undefined]}>
			<SideMenuItemList classes={{ 'dojo.io/SideMenuItemList': { root: [css.menuItems] } }}>
				Some content
			</SideMenuItemList>
		</div>
	));

	it('renders', () => {
		const h = harness(() => <SideMenuSection>Some content</SideMenuSection>);

		h.expect(baseAssertion);
	});

	it('renders fixed', () => {
		const h = harness(() => <SideMenuSection fixed>Some content</SideMenuSection>);

		const assertion = baseAssertion.setProperty('@menu-section', 'classes', [css.root, css.fixed]);
		h.expect(assertion);
	});

	it('renders with title', () => {
		const h = harness(() => <SideMenuSection title="A title">Some content</SideMenuSection>);

		const assertion = baseAssertion.prepend('@menu-section', () => [<h5 classes={css.title}>A title</h5>]);
		h.expect(assertion);
	});
});
