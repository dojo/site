import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Block from '@dojo/framework/widget-core/meta/Block';
import i18n from '@dojo/framework/i18n/i18n';

import { CompileRemoteBlockOptions } from '../scripts/compile-remote.block';
import referenceGuideBlock from '../scripts/reference-guide.block';
import { getLanguageFromLocale } from '../util/language';
import RemotePage from '../widgets/page/RemotePage';
import Section from '../widgets/section/Section';
import Page from '../widgets/page/Page';

import ReferenceGuideMenu from './reference-guides/ReferenceGuideMenu';

export interface ReferenceGuideProperties extends CompileRemoteBlockOptions {
	route: string;
	page: string;
}

export default class ReferenceGuide extends WidgetBase<ReferenceGuideProperties> {
	private _renderSupplementalPage() {
		const { repo, branch, path, page } = this.properties;
		const pages: any = this.meta(Block).run(referenceGuideBlock)({
			repo,
			branch,
			path: `${path}/supplemental.md`,
			locale: getLanguageFromLocale(i18n.locale)
		});

		if (pages && pages[page]) {
			return <Page hasLeftSideMenu>{pages[page]}</Page>
		}
	}

	protected render() {
		const { route, repo, branch, path, page } = this.properties;

		return (
			<Section key='section'>
				<ReferenceGuideMenu route={route} repo={repo} branch={branch} path={path} />
				{page === 'introduction' || page === 'basic-usage' ? (
					<RemotePage repo={repo} branch={branch} path={`${path}/${page}.md`} hasLeftSideMenu />
				): this._renderSupplementalPage()}
			</Section>
		);
	}
}
