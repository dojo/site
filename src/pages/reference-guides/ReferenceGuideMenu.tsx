import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import I18nMixin, { I18nProperties } from '@dojo/framework/widget-core/mixins/I18n';
import Block from '@dojo/framework/widget-core/meta/Block';
import i18n from '@dojo/framework/i18n/i18n';

import referenceGuideBlock from '../../scripts/reference-guide.block';
import { getLanguageFromLocale } from '../../util/language';
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

		const pages: any = this.meta(Block).run(referenceGuideBlock)({
			repo,
			branch,
			path: `${path}/supplemental.md`,
			locale: getLanguageFromLocale(i18n.locale),
			headersOnly: true
		});

		return (
			<SideMenu>
				<SideMenuSection>
					<SideMenuItemList>
						<SideMenuItem to={route} params={{ page: 'introduction' }}>{messages.introduction}</SideMenuItem>
						<SideMenuItem to={route} params={{ page: 'basic-usage' }}>{messages.basicUsage}</SideMenuItem>
						{pages && pages.map((page: string) => <SideMenuItem to={route} params={{ page: page.toLocaleLowerCase().replace(/[^a-z]/g, '-')	 }}>{page}</SideMenuItem>)}
					</SideMenuItemList>
				</SideMenuSection>
			</SideMenu>
		);
	}
}
