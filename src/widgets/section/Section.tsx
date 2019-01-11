import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import Build from '@dojo/framework/widget-core/meta/Build';
import { tsx } from '@dojo/framework/widget-core/tsx';
import diffProperty from '@dojo/framework/widget-core/decorators/diffProperty';
import sectionList from '../../scripts/section-list.build';
import * as css from './Section.m.css';

import Page from '../Page';
import SectionList from './SectionList';

export interface SectionParameters {
	section: string;
	path?: string;
}

interface SectionState {
	pages?: PageData[];
}

export interface PageData {
	name: string;
	path: string;
}

export default class Section extends WidgetBase<SectionParameters> {
	private _state: SectionState = {};

	private async _fetchSectionList() {
		const { section } = this.properties;
		this._state.pages = await this.meta(Build).run(sectionList)(section);
		this.invalidate();
	}

	@diffProperty('path')
	protected pathChange() {
		this.invalidate();
	}

	protected render() {
		let { path } = this.properties;
		const { section } = this.properties;
		let { pages } = this._state;

		if (!pages) {
			this._fetchSectionList();
			return <div />;
		}

		if (path === undefined) {
			if (pages.length === 0) {
				return <div classes={css.root} />;
			}
			path = pages[0].path;
		}

		return (
			<div classes={css.root}>
				<SectionList key={`list-${section}`} section={section} pages={pages} currentPath={path} />
				<Page key={`page-${section}-${path.replace('/', '-')}`} path={path} hasSection={true} />
			</div>
		);
	}
}
