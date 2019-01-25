import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';

import TutorialsLanding from './TutorialsLanding';

describe('TutorialsLanding', () => {
	it('renders', () => {
		const h = harness(() => <TutorialsLanding />);

		h.expect(() => (
			<h1>Landing Page Temp for Tutorials</h1>
		));
	});
});
