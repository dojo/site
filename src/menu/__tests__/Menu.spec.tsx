import harness from '@dojo/framework/testing/harness';
import assertionTemplate from '@dojo/framework/testing/assertionTemplate';
import { tsx } from '@dojo/framework/core/vdom';

import Link from '../../link/ActiveLink';

import * as css from '../Menu.m.css';
import Menu, { MenuLinkProperties } from '../Menu';

describe('Learn', () => {
	const links: MenuLinkProperties[] = [
		{
			label: 'Link 1',
			to: 'outlet',
			params: {
				param: 'value'
			}
		},
		{
			label: 'Link 2',
			to: 'outlet2'
		}
	];

	const baseAssertion = assertionTemplate(() => (
		<nav classes={css.root}>
			<ul classes={css.menuList}>
				<li classes={css.menuItem}>
					<Link classes={css.menuLink} activeClasses={[css.selected]} to="outlet" params={{ param: 'value' }}>
						Link 1
					</Link>
				</li>
				<li classes={css.menuItem}>
					<Link classes={css.menuLink} activeClasses={[css.selected]} to="outlet2">
						Link 2
					</Link>
				</li>
			</ul>
		</nav>
	));

	it('renders', () => {
		const h = harness(() => <Menu links={links} />);

		h.expect(baseAssertion);
	});
});
