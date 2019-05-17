import { tsx } from '@dojo/framework/widget-core/tsx';
import { switchLocale } from '@dojo/framework/i18n/i18n';
import harness from '@dojo/framework/testing/harness';
import assertionTemplate from '@dojo/framework/testing/assertionTemplate';
import Registry from '@dojo/framework/widget-core/Registry';
import Router from '@dojo/framework/routing/Router';
import MemoryHistory from '@dojo/framework/routing/history/MemoryHistory';

import * as compileRemoteHeaders from '../../scripts/compile-remote-headers.block';
import SideMenu from '../../widgets/menu/SideMenu';
import SideMenuSection from '../../widgets/menu/SideMenuSection';
import SideMenuItem from '../../widgets/menu/SideMenuItem';
import SideMenuItemList from '../../widgets/menu/SideMenuItemList';

import ReferenceGuideMenu from './ReferenceGuideMenu';

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

let invalidateCount = 0;
class TestReferenceGuideMenu extends ReferenceGuideMenu {
	constructor() {
		super();

		this.registry.base = registry;
	}

	invalidate() {
		invalidateCount++;
	}
}

describe('Reference Guide Menu', () => {
	const mockReferenceGuideBlock = jest.spyOn(compileRemoteHeaders, 'default').mockReturnValue([
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
	] as any);

	switchLocale('en-US');

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
		const h = harness(() => <ReferenceGuideMenu name="name" route="outlet" repo="dojo/framework" path="path/to" />);

		h.expect(baseStandaloneAssertion);

		expect(mockReferenceGuideBlock).toHaveBeenCalledWith({
			repo: 'dojo/framework',
			branch: undefined,
			path: 'path/to/supplemental.md',
			locale: 'en',
			headersOnly: true
		});
	});

	it('renders partial menu', () => {
		const h = harness(() => (
			<ReferenceGuideMenu
				name="name"
				route="outlet"
				repo="dojo/framework"
				path="path/to"
				standaloneMenu={false}
			/>
		));

		h.expect(basePartialAssertion);

		const widget = (h.getRender(0) as any).bind;
		widget.onAttach();

		expect(mockReferenceGuideBlock).toHaveBeenCalledWith({
			repo: 'dojo/framework',
			branch: undefined,
			path: 'path/to/supplemental.md',
			locale: 'en',
			headersOnly: true
		});
	});

	it('invalidates on route change', () => {
		const h = harness(() => (
			<TestReferenceGuideMenu
				name="name"
				route="outlet"
				repo="dojo/framework"
				path="path/to"
				standaloneMenu={false}
			/>
		));

		h.expect(basePartialAssertion);

		const widget = (h.getRender(0) as any).bind;
		widget.onAttach();
		invalidateCount = 0;
		router.setPath('/other');
		expect(invalidateCount).toBe(2);
	});
});
