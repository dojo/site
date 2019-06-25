import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';

import LinkedCard from '../widgets/card/LinkedCard';
import CardHeader from '../widgets/card/CardHeader';
import FontAwesomeIcon from '../widgets/icon/FontAwesomeIcon';

import * as css from './Community.m.css';
import Community from './Community';

describe('Community Page', () => {
	describe('Community', () => {
		it('renders', () => {
			const h = harness(() => <Community />);
			h.expectPartial('@links > *', () => (
				<a
					href="https://github.com/dojo/framework/blob/master/CODE_OF_CONDUCT.md"
					title="Read and understand our full Code of Conduct."
					classes={css.link}
					target="_blank"
				>
					<img classes={css.linkImage} src="test-file-stub" alt="Code of Conduct" />
					Code of Conduct
				</a>
			));
			h.expectPartial('@projects > *', () => (
				<LinkedCard
					header={<CardHeader title="@dojo/framework" />}
					url="https://github.com/dojo/framework"
					classes={{
						'dojo.io/Card': {
							root: [css.card],
							content: [css.cardContent]
						},
						'dojo.io/LinkedCard': {
							root: [css.cardLink]
						}
					}}
				>
					Dojo Framework. A Progressive Framework for Modern Web Apps
					<FontAwesomeIcon
						icon="external-link-alt"
						size="2x"
						classes={{ 'dojo.io/FontAwesomeIcon': { root: [css.cardLinkIcon] } }}
					/>
				</LinkedCard>
			));
		});
	});
});
