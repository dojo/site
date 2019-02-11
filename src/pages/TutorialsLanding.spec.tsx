import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';

import SectionLanding from '../widgets/section/SectionLanding';
import TutorialsLanding from './TutorialsLanding';

describe('TutorialsLanding', () => {
	it('renders', () => {
		const h = harness(() => <TutorialsLanding />);

		h.expect(() => <SectionLanding section="tutorials" />);
	});
});
