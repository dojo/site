import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import Block from '@dojo/framework/widget-core/meta/Block';
import { tsx } from '@dojo/framework/widget-core/tsx';
import sectionList from '../../scripts/section-list.block';
import * as css from './Section.m.css';

import Page from '../Page';
import SectionList from './SectionList';

export interface SectionParameters {
	section: string;
	path?: string;
}

export interface PageData {
	name: string;
	path: string;
}

export default class Section extends WidgetBase<SectionParameters> {
	private _fetchSectionList() {
		const { section } = this.properties;
		return this.meta(Block).run(sectionList)(section);
	}

	protected render() {
		let { path } = this.properties;
		const { section } = this.properties;
		const pages = this._fetchSectionList();

		return (
			<div classes={css.root}>
				<SectionList key={`list-${section}`} section={section} pages={pages} currentPath={path} />
				{path ? <Page key={`page-${section}-${path.replace('/', '-')}`} path={path} hasSection={true} /> : null}
			</div>
		);
	}
}
