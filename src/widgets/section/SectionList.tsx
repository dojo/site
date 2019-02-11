import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Link from '@dojo/framework/routing/Link';

import { Subsection, PageDefinition } from '../../scripts/section-list.block';

import * as css from './SectionList.m.css';

export interface SectionListParameters {
	section: string;
	currentPath?: string;
	subsections: Subsection[];
}

export default class SectionList extends WidgetBase<SectionListParameters> {
	private _renderSubsection(subsection: Subsection) {
		const { pages, name } = subsection;

		return (
			<div key={`subsection-list-${name}`} classes={css.subsection}>
				<h5 classes={css.subsectionHeader}>{name}</h5>
				<ul classes={css.list}>{pages.map((page) => this._renderPageLink(page))}</ul>
			</div>
		);
	}

	private _renderPageLink(page: PageDefinition) {
		const { section, currentPath = '' } = this.properties;
		const { path, name } = page;

		const extraClasses: string[] = [css.itemLink];
		const normalizedPath = path.replace(new RegExp(`^(.\/|..\/)*${section}\/`), '');
		const normalizedCurrentPath = currentPath.replace(new RegExp(`^(.\/|..\/)*${section}\/`), '');
		if (normalizedPath === normalizedCurrentPath) {
			extraClasses.push(css.selected);
		}

		return (
			<li key={`section-list-${section}-${path}`}>
				<Link to={`${section}-page`} params={{ page: normalizedPath }} classes={extraClasses}>
					{name}
				</Link>
			</li>
		);
	}

	protected render() {
		const { section, subsections } = this.properties;
		return (
			<div key={`section-list-${section}`} classes={css.root}>
				{subsections.map((subsection) => this._renderSubsection(subsection))}
			</div>
		);
	}
}
