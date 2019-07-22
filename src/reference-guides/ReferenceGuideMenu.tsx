import { tsx, create, invalidator } from '@dojo/framework/core/vdom';
import i18n from '@dojo/framework/core/middleware/i18n';
import block from '@dojo/framework/core/middleware/block';
import cache from '@dojo/framework/core/middleware/cache';
import injector from '@dojo/framework/core/middleware/injector';
import Router from '@dojo/framework/routing/Router';

import compileRemoteHeadersBlock, { SupplementalHeaders } from '../common/compile-remote-headers.block';
import SideMenu from '../menu/SideMenu';
import SideMenuSection from '../menu/SideMenuSection';
import SideMenuItem from '../menu/SideMenuItem';
import SideMenuItemList from '../menu/SideMenuItemList';

import bundle from './ReferenceGuideMenu.nls';

interface ReferenceGuideMenuProperties {
	name: string;
	route: string;
	repo: string;
	branch?: string;
	path: string;
	standaloneMenu?: boolean;
}

const factory = create({ i18n, block, cache, injector }).properties<ReferenceGuideMenuProperties>();

export default factory(function ReferenceGuideMenu({ middleware: { i18n, block, cache, injector }, properties }) {
	const { name, route, repo, branch, path, standaloneMenu = true } = properties();
	const { messages } = i18n.localize(bundle);

	const pages = block(compileRemoteHeadersBlock)({
		repo,
		branch,
		path: `${path}/supplemental.md`,
		locale: 'en',
		headersOnly: true
	}) as SupplementalHeaders[];

	const attached = cache.get<boolean>('attached');
	if (!attached) {
		const router = injector.get<Router>('router');
		if (router) {
			router.on('outlet', () => {
				invalidator();
			});
		}
	}

	const list = [
		<SideMenuItem to={route} params={{ page: 'introduction' }} inverse={!standaloneMenu}>
			{messages.introduction}
		</SideMenuItem>,
		<SideMenuItem to={route} params={{ page: 'basic-usage' }} inverse={!standaloneMenu}>
			{messages.basicUsage}
		</SideMenuItem>,
		pages &&
			pages.map((page) => (
				<SideMenuItem to={route} params={{ page: page.param }} inverse={!standaloneMenu}>
					{page.title}
				</SideMenuItem>
			))
	];

	if (!standaloneMenu) {
		return (
			<SideMenuItemList>
				<SideMenuItem name={name} inverse={!standaloneMenu}>
					<SideMenuItemList>{list}</SideMenuItemList>
				</SideMenuItem>
			</SideMenuItemList>
		);
	}

	return (
		<SideMenu>
			<SideMenuSection fixed>{list}</SideMenuSection>
		</SideMenu>
	);
});
