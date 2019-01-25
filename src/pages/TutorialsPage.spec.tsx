import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';

import Section from '../widgets/section/Section';

import TutorialsPage from './TutorialsPage';

describe('TutorialsPage', () => {
	it('renders', () => {
		const page = 'some-tutorial';

		const h = harness(() => <TutorialsPage page={page} />);

		h.expect(() => <Section key="section-tutorials" section="tutorials" path={`tutorials/${page}`} />);
	});
});
