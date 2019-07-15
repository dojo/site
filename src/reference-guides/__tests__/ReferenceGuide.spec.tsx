import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';
import assertionTemplate from '@dojo/framework/testing/assertionTemplate';
import { switchLocale } from '@dojo/framework/i18n/i18n';

import RemotePage from '../../page/RemotePage';
import Section from '../../section/Section';

import ReferenceGuideMenu from '../ReferenceGuideMenu';
import ReferenceGuide from '../ReferenceGuide';
import * as css from '../ReferenceGuide.m.css';

describe('ReferenceGuidesPage', () => {
	switchLocale('en-US');

	const route = 'reference-guide-i18n';
	const repo = 'dojo/framework';
	const path = 'path/to';
	const page = 'basic-usage';

	const baseAssertionTemplate = assertionTemplate(() => (
		<Section key="section">
			<div classes={css.menu}>
				<ReferenceGuideMenu name="i18n" route={route} repo={repo} branch={undefined} path={path} />
			</div>
		</Section>
	));

	it('renders', () => {
		const h = harness(() => (
			<ReferenceGuide name="i18n" route={route} repo={repo} branch={undefined} path={path} page={page} />
		));

		h.expect(
			baseAssertionTemplate.append('@section', () => [
				<RemotePage repo={repo} branch={undefined} path={`${path}/${page}.md`} />
			])
		);
	});

	it('renders supplemental page', () => {
		const h = harness(() => (
			<ReferenceGuide name="i18n" route={route} repo={repo} branch={undefined} path={path} page="some-page" />
		));

		h.expect(
			baseAssertionTemplate.append('@section', () => [
				<RemotePage repo={repo} branch={undefined} path={`${path}/supplemental.md`} header="some-page" />
			])
		);
	});
});
