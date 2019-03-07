import { tsx } from '@dojo/framework/widget-core/tsx';
import { switchLocale } from '@dojo/framework/i18n/i18n';
import harness from '@dojo/framework/testing/harness';
import assertionTemplate from '@dojo/framework/testing/assertionTemplate';

import * as compiler from '../../scripts/compile-remote.block';
import SideMenu from '../../widgets/menu/SideMenu';
import SideMenuSection from '../../widgets/menu/SideMenuSection';
import SideMenuItem from '../../widgets/menu/SideMenuItem';
import SideMenuItemList from '../../widgets/menu/SideMenuItemList';

import ReferenceGuideMenu from './ReferenceGuideMenu';

describe('Reference Guide Menu', () => {
	const mockRemoteCompiler = jest.spyOn(compiler, 'default').mockReturnValue((
		<ul>
			<h2>Misc Node</h2>
			<li>
				<p>
					<a href="./introduction">Introduction</a>
				</p>
			</li>
			<li>
				<a href="./basic-usage">Basic Usage</a>
			</li>
			<li>
				<a href="https://example.com">Absolute link</a>
			</li>
		</ul>
	) as any);

	switchLocale('en-US');

	const baseAssertion = assertionTemplate(() => (
		<SideMenu>
			<SideMenuSection>
				<SideMenuItemList>
					<h2>Misc Node</h2>
					<SideMenuItem to="outlet" params={{ page: 'introduction' }}>
						Introduction
					</SideMenuItem>
					<SideMenuItem to="outlet" params={{ page: 'basic-usage' }}>
						Basic Usage
					</SideMenuItem>
					<SideMenuItem to="https://example.com">Absolute link</SideMenuItem>
				</SideMenuItemList>
			</SideMenuSection>
		</SideMenu>
	));

	it('renders', () => {
		const h = harness(() => (
			<ReferenceGuideMenu route="outlet" repo="dojo/framework" path="path/to/file.md" page="basic-usage" />
		));

		h.expect(baseAssertion);

		expect(mockRemoteCompiler).toHaveBeenCalledWith({
			repo: 'dojo/framework',
			branch: undefined,
			path: 'path/to/file.md',
			locale: 'en-US'
		});
	});
});
