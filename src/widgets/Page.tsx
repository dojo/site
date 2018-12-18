import Build from '../scripts/Build';
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import SectionList from './SectionList';
import compiler from '../scripts/compile.build';
import * as css from './Page.m.css';

export interface PageParameters {
	section?: string;
	path: string;
}

export default class Page extends WidgetBase<PageParameters> {
	private _cache: { [page: string]: any } = {};

	private _getPage(path: string) {
		const page = this.meta(Build).run(compiler)(`./../../content/${path}.md`);
		this._cache[path] = page;
		return page;
	}

	protected render() {
		const { path, section } = this.properties;

		return <div classes={css.root}>
			{section ? <div classes={css.sectionList}>
				<SectionList section={section}></SectionList>
			</div> : undefined}
			<div classes={css.content}>{this._getPage(path)}</div>
		</div>;
	}
}
