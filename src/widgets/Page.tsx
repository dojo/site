import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import Build from '@dojo/framework/widget-core/meta/Build';
import { tsx } from '@dojo/framework/widget-core/tsx';
import compiler from '../scripts/compile.build';
import * as css from './Page.m.css';

export interface PageParameters {
	hasSection?: boolean;
	path: string;
}

export default class Page extends WidgetBase<PageParameters> {
	private _getPage(path: string) {
		return this.meta(Build).run(compiler)(`./../../content/${path}.md`);
	}

	protected render() {
		const { path, hasSection = false } = this.properties;

		const rootClasses = [css.root];
		if (hasSection) {
			rootClasses.push(css.contentShiftRight);
		}

		return (
			<div classes={rootClasses}>
				<div classes={css.content}>{this._getPage(path)}</div>
				{/* Future home of right menu */}
			</div>
		);
	}
}
