import { create, tsx } from '@dojo/framework/core/vdom';

import { CompileRemoteBlockOptions } from '../scripts/compile-remote.block';
import RemotePage from '../widgets/page/RemotePage';
import Section from '../widgets/section/Section';

import ReferenceGuideMenu from './reference-guides/ReferenceGuideMenu';
import * as css from './ReferenceGuide.m.css';

export interface ReferenceGuideProperties extends CompileRemoteBlockOptions {
	name: string;
	route: string;
	page: string;
}

const factory = create().properties<ReferenceGuideProperties>();

export default factory(function ReferenceGuide({ properties: { name, route, repo, branch, path, page } }) {
	return (
		<Section key="section">
			<div classes={css.menu}>
				<ReferenceGuideMenu name={name} route={route} repo={repo} branch={branch} path={path} />
			</div>
			{page === 'introduction' || page === 'basic-usage' ? (
				<RemotePage repo={repo} branch={branch} path={`${path}/${page}.md`} />
			) : (
				<RemotePage repo={repo} branch={branch} path={`${path}/supplemental.md`} header={page} />
			)}
		</Section>
	);
});
