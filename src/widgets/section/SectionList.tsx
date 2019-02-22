import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import ActiveLink from '@dojo/framework/routing/ActiveLink';

import { Subsection, PageDefinition } from '../../scripts/section-list.block';

import * as css from './SectionList.m.css';

export interface SectionListParameters {
	section: string;
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
		const { section } = this.properties;
		const { url, name } = page;

		return (
			<li key={`section-list-${section}-${url}`}>
				<ActiveLink
					to={`${section}-page`}
					params={{ page: url }}
					classes={css.itemLink}
					activeClasses={[css.selected]}
				>
					{name}
				</ActiveLink>
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
