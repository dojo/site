import Build from '@dojo/framework/widget-core/meta/Build';
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import compiler from '../scripts/compile.build';
import * as css from './Page.m.css';

export interface PageParameters {
	path: string;
}

export default class Page extends WidgetBase<PageParameters> {
	private _getPage(path: string) {
		return this.meta(Build).run(compiler)(`./../../content/${path}.md`);
	}

	protected render() {
		const { path } = this.properties;
		return <div classes={css.root}>{this._getPage(path)}</div>;
	}
}
