import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import I18nMixin from '@dojo/framework/widget-core/mixins/I18n';

import SideMenu from '../../widgets/menu/SideMenu';
import SideMenuSection from '../../widgets/menu/SideMenuSection';
import SideMenuItem from '../../widgets/menu/SideMenuItem';

import bundle from './TutorialMenu.nls';

export default class TutorialMenu extends I18nMixin(WidgetBase) {
	protected render() {
		const { messages } = this.localizeBundle(bundle);

		return (
			<SideMenu>
				<SideMenuSection title={messages.gettingStarted}>
					<SideMenuItem to="tutorial-local-installation">{messages.localInstllation}</SideMenuItem>
					<SideMenuItem to="tutorial-sample-tutorial">{messages.sampleTutorial}</SideMenuItem>
				</SideMenuSection>
				<SideMenuSection title={messages.advanced}>
					<SideMenuItem to="tutorial-another-tutorial">{messages.anotherTutorial}</SideMenuItem>
				</SideMenuSection>
			</SideMenu>
		);
	}
}
