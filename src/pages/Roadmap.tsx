import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import Block from '@dojo/framework/widget-core/meta/Block';
import { tsx } from '@dojo/framework/widget-core/tsx';
import i18n from '@dojo/framework/i18n/i18n';

import roadmapMetadataBlock, { RoadmapMetaData } from '../scripts/roadmap-metadata.block';
import Card from '../widgets/card/Card';
import CardHeader from '../widgets/card/CardHeader';
import FontAwesomeIcon from '../widgets/icon/FontAwesomeIcon';
import LocalPage from '../widgets/page/LocalPage';
import Page from '../widgets/page/Page';
import { getLanguageFromLocale } from '../util/language';

import * as css from './Roadmap.m.css';

export default class Roadmap extends WidgetBase {
	protected render() {
		const timelineEntries: RoadmapMetaData[] =
			(this.meta(Block).run(roadmapMetadataBlock)({
				locale: getLanguageFromLocale(i18n.locale)
			}) as any) || [];

		return (
			<Page classes={{ 'dojo.io/Page': { root: [css.root], content: [css.pageContent] } }}>
				<h1 classes={css.header}>What's coming up</h1>
				<div key="timeline" classes={css.timeline}>
					{timelineEntries.map((entry) => (
						<div classes={[css.timelineEntry, entry.released ? css.released : null]}>
							<div classes={css.timelineDate}>{entry.date}</div>
							<div classes={css.timelineDetails}>
								<div classes={css.timelineMarker}>
									<FontAwesomeIcon
										classes={{ 'dojo.io/FontAwesomeIcon': { root: [css.timelineIcon] } }}
										icon={entry.released ? 'box-open' : 'box'}
									/>
								</div>
								<Card
									header={
										<CardHeader
											title={entry.title}
											classes={{ 'dojo.io/CardHeader': { root: [css.cardHeader] } }}
										/>
									}
									classes={{ 'dojo.io/Card': { root: [css.card], content: [css.content] } }}
								>
									<LocalPage path={entry.file} warpInPage={false} />
								</Card>
							</div>
						</div>
					))}
				</div>
			</Page>
		);
	}
}
