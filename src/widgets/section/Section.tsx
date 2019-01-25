import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import Block from '@dojo/framework/widget-core/meta/Block';
import { Router } from '@dojo/framework/routing/Router';
import { tsx } from '@dojo/framework/widget-core/tsx';
import diffProperty from '@dojo/framework/widget-core/decorators/diffProperty';
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

	@diffProperty('path')
	protected pathChange() {
		this.invalidate();
	}

	protected render() {
		let { path } = this.properties;
		const { section } = this.properties;
		const pages = this._fetchSectionList();

		if (path === undefined) {
			const item = this.registry.getInjector<Router>('router');
			if (item && pages.length > 0) {
				path = pages[0].path;
				const router: Router = item.injector();
				router.setPath(path);
				return;
			}
		}

		return (
			<div classes={css.root}>
				<SectionList key={`list-${section}`} section={section} pages={pages} currentPath={path} />
				{path ? <Page key={`page-${section}-${path.replace('/', '-')}`} path={path} hasSection={true} /> : null}
			</div>
		);
	}
}
