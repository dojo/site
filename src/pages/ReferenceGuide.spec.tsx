import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';
import assertionTemplate from '@dojo/framework/testing/assertionTemplate';
import { switchLocale } from '@dojo/framework/i18n/i18n';

import * as referenceGuideBlock from '../scripts/reference-guide.block';
import RemotePage from '../widgets/page/RemotePage';
import Section from '../widgets/section/Section';

import ReferenceGuideMenu from './reference-guides/ReferenceGuideMenu';
import ReferenceGuide from './ReferenceGuide';
import Page from '../widgets/page/Page';

describe('ReferenceGuidesPage', () => {
	const mockReferenceGuideBlock = jest.spyOn(referenceGuideBlock, 'default').mockReturnValue({
		'some-page': [<h1>A page</h1>, <p>Some content</p>]
	} as any);

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
				<Page hasLeftSideMenu>
					<h1>A page</h1>
					<p>Some content</p>
				</Page>
			])
		);

		expect(mockReferenceGuideBlock).toHaveBeenCalledWith({
			repo: 'dojo/framework',
			branch: undefined,
			path: 'path/to/supplemental.md',
			locale: 'en'
		});
	});

	it('renders blank on unknown page', () => {
		const h = harness(() => (
			<ReferenceGuide route={route} repo={repo} branch={undefined} path={path} page="unknown-page" />
		));

		h.expect(baseAssertionTemplate);

		expect(mockReferenceGuideBlock).toHaveBeenCalledWith({
			repo: 'dojo/framework',
			branch: undefined,
			path: 'path/to/supplemental.md',
			locale: 'en'
		});
	});
});
