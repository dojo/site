import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import Block from '@dojo/framework/widget-core/meta/Block';
import { tsx } from '@dojo/framework/widget-core/tsx';
import sectionList from '../../scripts/section-list.block';
import * as css from './Section.m.css';

import Page from '../Page';
import SectionList from './SectionList';

export interface SectionParameters {
	section: string;
	path?: string;
}

export default class Section extends WidgetBase<SectionParameters> {
	protected render() {
		const { path, section } = this.properties;
		const subsections = this.meta(Block).run(sectionList)(section) || [];

		return (
			<div classes={css.root}>
				<SectionList key={`list-${section}`} section={section} subsections={subsections} />
				{path ? <Page key={`page-${section}-${path.replace('/', '-')}`} path={path} hasSection={true} /> : null}
			</div>
		);
	}
}
