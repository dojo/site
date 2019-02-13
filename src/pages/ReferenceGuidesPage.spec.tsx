import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';

import Section from '../widgets/section/Section';

import ReferenceGuidesPage from './ReferenceGuidesPage';

describe('ReferenceGuidesPage', () => {
	it('renders', () => {
		const page = 'some-reference-guide';

		const h = harness(() => <ReferenceGuidesPage page={page} />);

		h.expect(() => (
			<Section key="section-reference-guides" section="reference-guides" path={`reference-guides/${page}`} />
		));
	});
});
