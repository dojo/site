import { tsx } from '@dojo/framework/core/vdom';
import assertionTemplate from '@dojo/framework/testing/assertionTemplate';
import harness from '@dojo/framework/testing/harness';

import SideMenu from '../../widgets/menu/SideMenu';
import SideMenuSection from '../../widgets/menu/SideMenuSection';
import SideMenuItem from '../../widgets/menu/SideMenuItem';

import bundle from './TutorialMenu.nls';
import TutorialMenu from './TutorialMenu';

describe('Tutorial Menu', () => {
	const messages = bundle.messages;

	const baseAssertion = assertionTemplate(() => (
		<SideMenu>
			<SideMenuSection title={messages.gettingStarted}>
				<SideMenuItem to="tutorial-local-installation">{messages.localInstllation}</SideMenuItem>
				<SideMenuItem to="tutorial-sample-tutorial">{messages.sampleTutorial}</SideMenuItem>
			</SideMenuSection>
			<SideMenuSection title={messages.advanced}>
				<SideMenuItem to="tutorial-another-tutorial">{messages.anotherTutorial}</SideMenuItem>
			</SideMenuSection>
		</SideMenu>
	));

	it('renders', () => {
		const h = harness(() => <TutorialMenu />);

		h.expect(baseAssertion);
	});
});
