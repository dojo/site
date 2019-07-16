import WidgetBase from '@dojo/framework/core/WidgetBase';
import { tsx } from '@dojo/framework/core/vdom';

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

export default class ReferenceGuide extends WidgetBase<ReferenceGuideProperties> {
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
