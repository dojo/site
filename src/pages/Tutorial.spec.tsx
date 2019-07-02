import { tsx } from '@dojo/framework/core/vdom';
import assertionTemplate from '@dojo/framework/testing/assertionTemplate';
import harness from '@dojo/framework/testing/harness';

import LocalPage from '../widgets/page/LocalPage';
import Section from '../widgets/section/Section';

import TutorialMenu from './tutorials/TutorialMenu';
import Tutorial from './Tutorial';

export interface TutorialPageProperties {
	path: string;
}

describe('Tutorial', () => {
	const baseAssertion = assertionTemplate(() => (
		<Section>
			<TutorialMenu />
			<LocalPage path="local-installation" />
		</Section>
	));

	it('renders', () => {
		const h = harness(() => <Tutorial path="local-installation" />);

		h.expect(baseAssertion);
	});
});
