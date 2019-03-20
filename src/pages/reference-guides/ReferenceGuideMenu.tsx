import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import I18nMixin, { I18nProperties } from '@dojo/framework/widget-core/mixins/I18n';
import Block from '@dojo/framework/widget-core/meta/Block';

import compileRemoteHeaders, { SupplementalHeaders } from '../../scripts/compile-remote-headers.block';
import SideMenu from '../../widgets/menu/SideMenu';
import SideMenuSection from '../../widgets/menu/SideMenuSection';
import SideMenuItem from '../../widgets/menu/SideMenuItem';
import SideMenuItemList from '../../widgets/menu/SideMenuItemList';

import bundle from './ReferenceGuideMenu.nls';

interface ReferenceGuideMenuProperties extends I18nProperties {
	route: string;
	repo: string;
	branch?: string;
	path: string;
}

export default class ReferenceGuideMenu extends I18nMixin(WidgetBase)<ReferenceGuideMenuProperties> {
	protected render() {
		const { route, repo, branch, path } = this.properties;
		const { messages } = this.localizeBundle(bundle);

		const pages: SupplementalHeaders[] = this.meta(Block).run(compileRemoteHeaders)({
			repo,
			branch,
			path: `${path}/supplemental.md`,
			locale: 'en',
			headersOnly: true
		}) as any;

		return (
			<SideMenu>
				<SideMenuSection>
					<SideMenuItemList>
						<SideMenuItem to={route} params={{ page: 'introduction' }}>
							{messages.introduction}
						</SideMenuItem>
						<SideMenuItem to={route} params={{ page: 'basic-usage' }}>
							{messages.basicUsage}
						</SideMenuItem>
						{pages &&
							pages.map((page) => (
								<SideMenuItem to={route} params={{ page: page.param }}>
									{page.title}
								</SideMenuItem>
							))}
					</SideMenuItemList>
				</SideMenuSection>
			</SideMenu>
		);
	}
}
