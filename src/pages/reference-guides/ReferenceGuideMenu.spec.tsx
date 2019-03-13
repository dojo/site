import { tsx } from '@dojo/framework/widget-core/tsx';
import { switchLocale } from '@dojo/framework/i18n/i18n';
import harness from '@dojo/framework/testing/harness';
import assertionTemplate from '@dojo/framework/testing/assertionTemplate';

import * as compileRemoteHeaders from '../../scripts/compile-remote-headers.block';
import SideMenu from '../../widgets/menu/SideMenu';
import SideMenuSection from '../../widgets/menu/SideMenuSection';
import SideMenuItem from '../../widgets/menu/SideMenuItem';
import SideMenuItemList from '../../widgets/menu/SideMenuItemList';

import ReferenceGuideMenu from './ReferenceGuideMenu';

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

	const baseAssertion = assertionTemplate(() => (
		<SideMenu>
			<SideMenuSection>
				<SideMenuItemList>
					<SideMenuItem to="outlet" params={{ page: 'introduction' }}>
						Introduction
					</SideMenuItem>
					<SideMenuItem to="outlet" params={{ page: 'basic-usage' }}>
						Basic Usage
					</SideMenuItem>
					<SideMenuItem to="outlet" params={{ page: 'test-1' }}>
						Test 1
					</SideMenuItem>
					<SideMenuItem to="outlet" params={{ page: 'page-2' }}>
						Page 2
					</SideMenuItem>
					<SideMenuItem to="outlet" params={{ page: 'advanced-details-3' }}>
						Advanced Details 3
					</SideMenuItem>
				</SideMenuItemList>
			</SideMenuSection>
		</SideMenu>
	));

	it('renders', () => {
		const h = harness(() => <ReferenceGuideMenu route="outlet" repo="dojo/framework" path="path/to" />);

		h.expect(baseAssertion);

		expect(mockReferenceGuideBlock).toHaveBeenCalledWith({
			repo: 'dojo/framework',
			branch: undefined,
			path: 'path/to/supplemental.md',
			locale: 'en',
			headersOnly: true
		});
	});
});
