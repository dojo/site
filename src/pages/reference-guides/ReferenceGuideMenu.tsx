import WidgetBase from '@dojo/framework/core/WidgetBase';
import { tsx } from '@dojo/framework/core/vdom';
import I18nMixin, { I18nProperties } from '@dojo/framework/core/mixins/I18n';
import Block from '@dojo/framework/core/meta/Block';
import Router from '@dojo/framework/routing/Router';

import compileRemoteHeaders, { SupplementalHeaders } from '../../scripts/compile-remote-headers.block';
import SideMenu from '../../widgets/menu/SideMenu';
import SideMenuSection from '../../widgets/menu/SideMenuSection';
import SideMenuItem from '../../widgets/menu/SideMenuItem';
import SideMenuItemList from '../../widgets/menu/SideMenuItemList';

import bundle from './ReferenceGuideMenu.nls';

interface ReferenceGuideMenuProperties extends I18nProperties {
	name: string;
	route: string;
	repo: string;
	branch?: string;
	path: string;
	standaloneMenu?: boolean;
}

export default class ReferenceGuideMenu extends I18nMixin(WidgetBase)<ReferenceGuideMenuProperties> {
	protected onAttach() {
		const item = this.registry.getInjector<Router>('router');
		if (item) {
			const router = item.injector();
			router.on('outlet', () => {
				this.invalidate();
			});
		}
	}

	protected render() {
		const { name, route, repo, branch, path, standaloneMenu = true } = this.properties;
		const { messages } = this.localizeBundle(bundle);

		const pages: SupplementalHeaders[] = this.meta(Block).run(compileRemoteHeaders)({
			repo,
			branch,
			path: `${path}/supplemental.md`,
			locale: 'en',
			headersOnly: true
		}) as any;

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
	}
}
