import { tsx } from '@dojo/framework/widget-core/tsx';
import harness from '@dojo/framework/testing/harness';

import Card from '../widgets/card/Card';
import CardHeader from '../widgets/card/CardHeader';
import FontAwesomeIcon from '../widgets/icon/FontAwesomeIcon';
import LocalPage from '../widgets/page/LocalPage';

import Roadmap from './Roadmap';
import * as css from './Roadmap.m.css';

describe('Roadmap Page', () => {
	it('renders', () => {
		const h = harness(() => <Roadmap />);

		h.expectPartial('@timeline > *:last-child', () => (
			<div classes={[css.timelineEntry, css.released]}>
				<div classes={css.timelineDate}>January 2019</div>
				<div classes={css.timelineDetails}>
					<div classes={css.timelineMarker}>
						<FontAwesomeIcon
							classes={{ 'dojo.io/FontAwesomeIcon': { root: [css.timelineIcon] } }}
							icon={'box-open'}
						/>
					</div>
					<Card
						header={
							<CardHeader title="Dojo 5" classes={{ 'dojo.io/CardHeader': { root: [css.cardHeader] } }} />
						}
						classes={{ 'dojo.io/Card': { root: [css.card], content: [css.content] } }}
					>
						<LocalPage path={`roadmap/dojo-5.0.0-release.md`} warpInPage={false} />
					</Card>
				</div>
			</div>
		));
	});
});
