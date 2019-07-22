import harness from '@dojo/framework/testing/harness';
import assertionTemplate from '@dojo/framework/testing/assertionTemplate';
import { tsx } from '@dojo/framework/core/vdom';
import block from '@dojo/framework/core/middleware/block';
import Registry from '@dojo/framework/core/Registry';
import Router from '@dojo/framework/routing/Router';
import MemoryHistory from '@dojo/framework/routing/history/MemoryHistory';

import compileRemoteHeadersBlock from '../../common/compile-remote-headers.block';
import SideMenu from '../../menu/SideMenu';
import SideMenuSection from '../../menu/SideMenuSection';
import SideMenuItem from '../../menu/SideMenuItem';
import SideMenuItemList from '../../menu/SideMenuItemList';

import ReferenceGuideMenu from '../ReferenceGuideMenu';
import createBlockMock from '../../test/mockBlock';

const registry = new Registry();

const router = new Router(
	[
		{
			path: 'foo',
			outlet: 'foo',
			children: [
				{
					path: 'bar',
					outlet: 'bar'
				}
			]
		},
		{
			path: 'other',
			outlet: 'other'
		},
		{
			path: 'param',
			outlet: 'param',
			children: [
				{
					path: '{suffix}',
					outlet: 'suffixed-param'
				}
			]
		}
	],
	{ HistoryManager: MemoryHistory }
);

registry.defineInjector('router', () => () => router);

describe('Reference Guide Menu', () => {
	const blockMock = createBlockMock([
		[
			compileRemoteHeadersBlock,
			[
				{
					title: 'Test 1',
					param: 'test-1'
				},
				{
					title: 'Page 2',
					param: 'page-2'
				},
				{
					title: 'Advanced Details 3',
					param: 'advanced-details-3'
				}
			]
		]
	]);

	interface MenuItemsOptions {
		inverse?: boolean;
	}
	const menuItems = (options?: MenuItemsOptions) => {
		const { inverse = false } = options || {};

		return [
			<SideMenuItem to="outlet" params={{ page: 'introduction' }} inverse={inverse}>
				Introduction
			</SideMenuItem>,
			<SideMenuItem to="outlet" params={{ page: 'basic-usage' }} inverse={inverse}>
				Basic Usage
			</SideMenuItem>,
			<SideMenuItem to="outlet" params={{ page: 'test-1' }} inverse={inverse}>
				Test 1
			</SideMenuItem>,
			<SideMenuItem to="outlet" params={{ page: 'page-2' }} inverse={inverse}>
				Page 2
			</SideMenuItem>,
			<SideMenuItem to="outlet" params={{ page: 'advanced-details-3' }} inverse={inverse}>
				Advanced Details 3
			</SideMenuItem>
		];
	};

	const baseStandaloneAssertion = assertionTemplate(() => (
		<SideMenu>
			<SideMenuSection fixed>{menuItems()}</SideMenuSection>
		</SideMenu>
	));

	const basePartialAssertion = assertionTemplate(() => (
		<SideMenuItemList>
			<SideMenuItem name="name" inverse>
				<SideMenuItemList>{menuItems({ inverse: true })}</SideMenuItemList>
			</SideMenuItem>
		</SideMenuItemList>
	));

	it('renders standalone menu', () => {
		const h = harness(
			() => <ReferenceGuideMenu name="name" route="outlet" repo="dojo/framework" path="path/to" />,
			{ middleware: [[block, blockMock]] }
		);

		h.expect(baseStandaloneAssertion);
	});

	it('renders partial menu', () => {
		const h = harness(
			() => (
				<ReferenceGuideMenu
					name="name"
					route="outlet"
					repo="dojo/framework"
					path="path/to"
					standaloneMenu={false}
				/>
			),
			{ middleware: [[block, blockMock]] }
		);

		h.expect(basePartialAssertion);
	});
});
