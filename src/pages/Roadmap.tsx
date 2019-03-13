import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';

import Card from '../widgets/card/Card';
import CardHeader from '../widgets/card/CardHeader';
import FontAwesomeIcon from '../widgets/icon/FontAwesomeIcon';
import LocalPage from '../widgets/page/LocalPage';
import Page from '../widgets/page/Page';

import * as css from './Roadmap.m.css';

interface TimelineEntry {
	title: string;
	date: string;
	file: string;
	released: boolean;
}

const timelineEntries: TimelineEntry[] = [
	{
		title: 'Dojo 6',
		date: 'Q2 2019',
		file: 'dojo-6.0.0-release.md',
		released: false
	},
	{
		title: 'Dojo 5',
		date: 'Junuary 2019',
		file: 'dojo-5.0.0-release.md',
		released: true
	}
];

export default class Roadmap extends WidgetBase {
	protected render() {
		return (
			<Page classes={{ 'dojo.io/Page': { root: [css.root], content: [css.pageContent] } }}>
				<h1 classes={css.header}>What's coming up</h1>
				<div classes={css.timeline}>
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
									<LocalPage path={`roadmap/${entry.file}`} warpInPage={false} />
								</Card>
							</div>
						</div>
					))}
				</div>
			</Page>
		);
	}
}
