import { tsx } from '@dojo/framework/widget-core/tsx';
import assertionTemplate from '@dojo/framework/testing/assertionTemplate';
import harness from '@dojo/framework/testing/harness';

import * as css from './SideMenuItemList.m.css';
import SideMenuItemList from './SideMenuItemList';

describe('Side Menu List', () => {
	const baseAssertion = assertionTemplate(() => <ul classes={css.root}>Some content</ul>);

	it('renders', () => {
		const h = harness(() => <SideMenuItemList>Some content</SideMenuItemList>);

		h.expect(baseAssertion);
	});
});
