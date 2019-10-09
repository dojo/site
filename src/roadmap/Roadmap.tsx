import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import block from '@dojo/framework/core/middleware/block';

import metadataBlock from './metadata.block';
import Card from '../card/Card';
import CardHeader from '../card/CardHeader';
import LocalPage from '../page/LocalPage';
import Page from '../page/Page';

import * as css from './Roadmap.m.css';

const factory = create({ theme, block });

export default factory(function Roadmap({ middleware: { theme, block } }) {
	const themedCss = theme.classes(css);

	const timelineEntries = block(metadataBlock)({ locale: 'en' }) || [];

	return (
		<Page classes={{ 'dojo.io/Page': { root: [themedCss.root], content: [themedCss.pageContent] } }}>
			<h1 classes={themedCss.header}>What's coming up</h1>
			<div key="timeline" classes={themedCss.timeline}>
				{timelineEntries.map((entry) => (
					<div classes={[themedCss.timelineEntry, entry.released ? themedCss.released : null]}>
						<div classes={themedCss.timelineDate}>{entry.date}</div>
						<div classes={themedCss.timelineDetails}>
							<div classes={themedCss.timelineMarker} />
							<Card
								header={
									<h3>
										<CardHeader
											title={entry.title}
											classes={{ 'dojo.io/CardHeader': { root: [themedCss.cardHeader] } }}
										/>
									</h3>
								}
								classes={{ 'dojo.io/Card': { root: [themedCss.card], content: [themedCss.content] } }}
							>
								<LocalPage path={entry.file} wrapInPage={false} />
							</Card>
						</div>
					</div>
				))}
			</div>
		</Page>
	);
});
