import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import Block from '@dojo/framework/widget-core/meta/Block';
import { tsx } from '@dojo/framework/widget-core/tsx';
import { DNode } from '@dojo/framework/widget-core/interfaces';

import sectionList, { Subsection, PageDefinition } from '../../scripts/section-list.block';
import LinkedCard from '../card/LinkedCard';
import CardIconHeader, { IconHeaderBackgroundColor } from '../card/CardIconHeader';
import Grid from '../grid/Grid';

import * as css from './SectionLanding.m.css';

export interface SectionLandingParameters {
	section: string;
}

const topicColors: { [key: string]: IconHeaderBackgroundColor } = {
	dev: 'black',
	cli: 'black',
	themes: 'green',
	forms: 'purple',
	widgets: 'orange'
};

export default class SectionLanding extends WidgetBase<SectionLandingParameters> {
	private _fetchSectionList() {
		const { section } = this.properties;
		return this.meta(Block).run(sectionList)(section) || [];
	}

	private _renderSubsection(subsection: Subsection): DNode {
		const { pages, name } = subsection;

		return (
			<div key={`subsection-${name}`} classes={css.subsection}>
				<h2>{name}</h2>
				<Grid key={`subsection-list-${name}`}>{pages.map((page) => this._renderPageCard(page))}</Grid>
			</div>
		);
	}

	private _renderPageCard(page: PageDefinition): DNode {
		const { section } = this.properties;
		const { name, path, description, icon, topic } = page;

		return (
			<div key={`${section}-page-${path}`} classes={css.pageLink}>
				<LinkedCard
					header={<CardIconHeader icon={icon} background={topicColors[topic]} />}
					outlet={`${section}-page`}
					params={{ page: path.replace(new RegExp(`^(.\/|..\/)*${section}\/`), '') }}
				>
					<h4 classes={css.title}>{name}</h4>
					{description}
				</LinkedCard>
			</div>
		);
	}

	protected render() {
		return (
			<div classes={css.root}>
				{this._fetchSectionList().map((subsection) => this._renderSubsection(subsection))}
			</div>
		);
	}
}
