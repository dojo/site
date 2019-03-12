import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';
import assertionTemplate from '@dojo/framework/testing/assertionTemplate';
import { switchLocale } from '@dojo/framework/i18n/i18n';

import RemotePage from '../widgets/page/RemotePage';
import Section from '../widgets/section/Section';

import ReferenceGuideMenu from './reference-guides/ReferenceGuideMenu';
import ReferenceGuide from './ReferenceGuide';

describe('ReferenceGuidesPage', () => {
	switchLocale('en-US');

	const route = 'reference-guide-i18n';
	const repo = 'dojo/framework';
	const path = 'path/to';
	const page = 'basic-usage';

	const baseAssertionTemplate = assertionTemplate(() => (
		<Section key="section">
			<ReferenceGuideMenu route={route} repo={repo} branch={undefined} path={path} />
		</Section>
	));

	it('renders', () => {
		const h = harness(() => (
			<ReferenceGuide route={route} repo={repo} branch={undefined} path={path} page={page} />
		));

		h.expect(
			baseAssertionTemplate.append('@section', [
				<RemotePage repo={repo} branch={undefined} path={`${path}/${page}.md`} hasLeftSideMenu />
			])
		);
	});

	it('renders supplemental page', () => {
		const h = harness(() => (
			<ReferenceGuide route={route} repo={repo} branch={undefined} path={path} page="some-page" />
		));

		h.expect(
			baseAssertionTemplate.append('@section', [
				<RemotePage
					repo={repo}
					branch={undefined}
					path={`${path}/supplemental.md`}
					header="some-page"
					hasLeftSideMenu
				/>
			])
		);
	});
});
