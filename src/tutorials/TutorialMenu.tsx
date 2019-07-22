import { tsx, create } from '@dojo/framework/core/vdom';
import i18n from '@dojo/framework/core/middleware/i18n';

import SideMenu from '../menu/SideMenu';
import SideMenuSection from '../menu/SideMenuSection';
import SideMenuItem from '../menu/SideMenuItem';

import bundle from './TutorialMenu.nls';

const factory = create({ i18n });

export default factory(function TutorialMenu({ middleware: { i18n } }) {
	const { messages } = i18n.localize(bundle);

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
});
