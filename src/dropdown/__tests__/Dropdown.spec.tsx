import harness from '@dojo/framework/testing/harness/harness';
import assertionTemplate from '@dojo/framework/testing/harness/assertionTemplate';
import { tsx } from '@dojo/framework/core/vdom';
import Link from '@dojo/framework/routing/Link';

import * as css from '../Dropdown.m.css';
import Dropdown from '../Dropdown';

describe('Dropdown', () => {
	const baseAssertion = assertionTemplate(() => (
		<div classes={css.root}>
			<div classes={css.content}>
				<ul classes={css.list}>
					<li classes={css.listItem}>
						<Link key="key1" classes={css.link} to="outletName1">
							Link Name 1
						</Link>
					</li>
					<li classes={css.listItem}>
						<Link key="key2" classes={css.link} to="outletName2" params={{ paramName: 'paramValue' }}>
							Link Name 2
						</Link>
					</li>
				</ul>
			</div>
			{parent('Link Name 1', true)}
		</div>
	));

	const parent = (name: string, showChevron: boolean, classes = [css.parent, false]) => (
		<div classes={classes}>
			{name}
			{showChevron && <span classes={css.chevron}></span>}
		</div>
	);

	it('renders', () => {
		const h = harness(() => (
			<Dropdown
				activeName="Link Name 1"
				items={[
					{
						key: 'key1',
						label: 'Link Name 1',
						to: 'outletName1'
					},
					{
						key: 'key2',
						label: 'Link Name 2',
						to: 'outletName2',
						params: { paramName: 'paramValue' }
					}
				]}
			/>
		));

		h.expect(baseAssertion);
	});

	it('does not render dropdown if only one menu item is provided', () => {
		const h = harness(() => (
			<Dropdown
				activeName="Link Name 1"
				items={[
					{
						key: 'key1',
						label: 'Link Name 1',
						to: 'outletName1'
					}
				]}
			/>
		));

		h.expect(
			baseAssertion.setChildren(':root', () => [
				false,
				parent('Link Name 1', false, [css.parent, css.noDropdown])
			])
		);
	});
});
