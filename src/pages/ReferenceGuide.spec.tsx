import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';

import Section from '../widgets/section/Section';

import ReferenceGuide from './ReferenceGuide';
import assertionTemplate from '@dojo/framework/testing/assertionTemplate';
import ReferenceGuideMenu from './reference-guides/ReferenceGuideMenu';
import RemotePage from '../widgets/page/RemotePage';

describe('ReferenceGuidesPage', () => {
	const route = 'reference-guide-i18n';
	const repo = 'dojo/framework';
	const path = 'path/to/file.md';
	const page = 'basic-usage';

	const baseAssertionTemplate = assertionTemplate(() => (
		<Section>
			<ReferenceGuideMenu route={route} repo={repo} branch={undefined} path={path} page={page} />
			<RemotePage repo={repo} branch={undefined} path={path} relativeUrl={page} hasLeftSideMenu />
		</Section>
	));

	it('renders', () => {
		const h = harness(() => (
			<ReferenceGuide route={route} repo={repo} branch={undefined} path={path} page={page} />
		));

		h.expect(baseAssertionTemplate);
	});
});
