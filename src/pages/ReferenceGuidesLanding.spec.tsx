import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';

import SectionLanding from '../widgets/section/SectionLanding';
import ReferenceGuidesLanding from './ReferenceGuidesLanding';

describe('ReferenceGuidesLanding', () => {
	it('renders', () => {
		const h = harness(() => <ReferenceGuidesLanding />);

		h.expect(() => <SectionLanding section="reference-guides" />);
	});
});
