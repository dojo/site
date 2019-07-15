import { tsx } from '@dojo/framework/core/vdom';
import assertionTemplate from '@dojo/framework/testing/assertionTemplate';
import harness from '@dojo/framework/testing/harness';

import * as css from '../SideMenu.m.css';
import SideMenu from '../SideMenu';

describe('Side Menu', () => {
	const baseAssertion = assertionTemplate(() => (
		<div key="side-menu" classes={css.root}>
			Some content
		</div>
	));

	it('renders', () => {
		const h = harness(() => <SideMenu>Some content</SideMenu>);

		h.expect(baseAssertion);
	});
});
