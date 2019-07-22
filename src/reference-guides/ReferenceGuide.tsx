import { tsx, create } from '@dojo/framework/core/vdom';

import { CompileRemoteBlockOptions } from '../common/compile-remote.block';
import RemotePage from '../page/RemotePage';
import Section from '../section/Section';

import ReferenceGuideMenu from './ReferenceGuideMenu';
import * as css from './ReferenceGuide.m.css';

export interface ReferenceGuideProperties extends CompileRemoteBlockOptions {
	name: string;
	route: string;
	page: string;
}

const factory = create().properties<ReferenceGuideProperties>();

export default factory(function ReferenceGuide({ properties }) {
	const { name, route, repo, branch, path, page } = properties();

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
