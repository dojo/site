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
		const { name, url, path, description, icon, topic } = page;

		return (
			<div key={`${section}-page-${path}`} classes={css.pageLink}>
				<LinkedCard
					header={<CardIconHeader icon={icon} background={topicColors[topic]} />}
					outlet={`${section}-page`}
					params={{ page: url }}
				>
					<h4 classes={css.title}>{name}</h4>
					{description}
				</LinkedCard>
			</div>
		);
	}

	protected render() {
		const { section } = this.properties;
		const subsections = this.meta(Block).run(sectionList)(section) || [];

		return <div classes={css.root}>{subsections.map((subsection) => this._renderSubsection(subsection))}</div>;
	}
}
