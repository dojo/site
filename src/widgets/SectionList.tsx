import Build from '../scripts/Build';
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Link from '@dojo/framework/routing/ActiveLink';
import sectionList from '../scripts/section-list.build';
import * as css from './SectionList.m.css';

export interface SectionListParameters {
	section: string;
}

export default class SectionList extends WidgetBase<SectionListParameters> {
	private _renderSectionList() {
		const { section } = this.properties;
		const list = this.meta(Build).run(sectionList)(section);
		return <ul key={`section-list-${section}`} classes={css.list}>
			{list.map((s) => {
				console.log(s);
				return <li key={`section-list-${section}-${s.path}`} classes={css.item}>
					<Link to='page' params={{section, page: s.path}} activeClasses={[css.selected]}>{s.name}</Link>
				</li>;
			})}
		</ul>;
	}

	protected render() {
		return <div classes={css.root}>{this._renderSectionList()}</div>;
	}
}
