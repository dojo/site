import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';

import ReferenceGuidesLanding from './ReferenceGuidesLanding';

describe('ReferenceGuidesLanding', () => {
	it('renders', () => {
		const h = harness(() => <ReferenceGuidesLanding />);

		h.expect(() => <h1>Landing Page Temp for Reference Guides</h1>);
	});
});
