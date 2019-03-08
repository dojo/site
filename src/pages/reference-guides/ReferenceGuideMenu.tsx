import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import I18nMixin, { I18nProperties } from '@dojo/framework/widget-core/mixins/I18n';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { isVNode } from '@dojo/framework/widget-core/d';
import Block from '@dojo/framework/widget-core/meta/Block';
import i18n from '@dojo/framework/i18n/i18n';

import compiler from '../../scripts/compile-remote.block';
import visitor from '../../util/visitor';
import SideMenu from '../../widgets/menu/SideMenu';
import SideMenuSection from '../../widgets/menu/SideMenuSection';
import SideMenuItem from '../../widgets/menu/SideMenuItem';
import SideMenuItemList from '../../widgets/menu/SideMenuItemList';

interface ReferenceGuideMenuProperties extends I18nProperties {
	route: string;
	repo: string;
	branch?: string;
	path: string;
	page: string;
}

export default class ReferenceGuideMenu extends I18nMixin(WidgetBase)<ReferenceGuideMenuProperties> {
	private _parseList(node: DNode) {
		const { route } = this.properties;
		if (isVNode(node)) {
			if (node.tag === 'ul') {
				return <SideMenuItemList>{node.children}</SideMenuItemList>;
			} else if (node.tag === 'p' || node.tag === 'li') {
				return node.children; // Replace the current node with its children.
			} else if (node.tag === 'a') {
				const match = /^\.\/([^\s#]+)([#][\S]+)?$/g.exec(node.properties.href);
				let page = '';
				if (match && match.length >= 2) {
					page = match[1];
					return (
						<SideMenuItem to={route} params={{ page: page }}>
							{node.children}
						</SideMenuItem>
					);
				}
				return <SideMenuItem to={node.properties.href}>{node.children}</SideMenuItem>;
			}
		}
	}

	private _getMenuItems() {
		const { repo, branch, path } = this.properties;
		let indexPageContent = this.meta(Block).run(compiler)({
			repo,
			branch,
			path,
			locale: i18n.locale
		}) as any;

		// Deep copy index page content to avoid conflict with landing page as we are about to modify the response objects.
		indexPageContent = JSON.parse(JSON.stringify(indexPageContent));

		return visitor(indexPageContent, this._parseList.bind(this));
	}

	protected render() {
		return (
			<SideMenu>
				<SideMenuSection>{this._getMenuItems()}</SideMenuSection>
			</SideMenu>
		);
	}
}
