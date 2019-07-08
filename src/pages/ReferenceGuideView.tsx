import WidgetBase from '@dojo/framework/core/WidgetBase';
import { tsx } from '@dojo/framework/core/vdom';

import { CompileRemoteBlockOptions } from '../scripts/compile-remote.block';
import RemotePage from '../widgets/page/RemotePage';
import Section from '../widgets/section/Section';

import ReferenceGuideMenu from './reference-guides/ReferenceGuideMenu';
import * as css from './ReferenceGuideView.m.css';

export interface ReferenceGuideViewProperties extends CompileRemoteBlockOptions {
	name: string;
	route: string;
	page: string;
}

export default class ReferenceGuideView extends WidgetBase<ReferenceGuideViewProperties> {
	protected render() {
		const { name, route, repo, branch, path, page } = this.properties;

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
	}
}
