import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Link from '@dojo/framework/routing/Link';
import { PageData } from './Section';
import * as css from './SectionList.m.css';

export interface SectionListParameters {
	section: string;
	currentPath: string;
	pages: PageData[];
}

export default class SectionList extends WidgetBase<SectionListParameters> {
	protected render() {
		const { pages, section, currentPath } = this.properties;
		return (
			<div key={`section-list-${section}`} classes={css.root}>
				<ul classes={css.list}>
					{pages.map((s) => {
						const extraClasses: { [key: string]: string } = {};
						if (s.path === currentPath) {
							extraClasses.root = css.selected;
						}

						return (
							<li key={`section-list-${section}-${s.path}`} classes={css.item}>
								<Link to={`${section}-page`} params={{ page: s.path }} extraClasses={extraClasses}>
									{s.name}
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}
