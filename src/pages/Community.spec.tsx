import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';

import Grid from '../widgets/grid/Grid';
import LinkedCard from '../widgets/card/LinkedCard';

import Community, { SimpleLinkedCardProperties } from './Community';
import * as css from './Community.m.css';
import CardHeader from '../widgets/card/CardHeader';

describe('Community Page', () => {
	describe('Community', () => {
		it('renders', () => {
			const links: SimpleLinkedCardProperties[] = [
				{ title: 'test', url: 'test', image: { src: 'test', alt: 'test' }, description: 'test' },
				{ title: 'test2', url: 'test2', image: 'test2', description: 'test2' }
			];
			const projects: SimpleLinkedCardProperties[] = [{ title: 'test', url: 'test', description: 'test' }];
			const h = harness(() => <Community links={links} projects={projects} />);
			h.expect(() => (
				<div classes={[css.root]}>
					<h2>Community Links</h2>

					<Grid>
						<LinkedCard
							header={<CardHeader title="test" image={{ src: 'test', alt: 'test' }} />}
							url="test"
						>
							test
						</LinkedCard>
						<LinkedCard header={<CardHeader title="test2" image="test2" />} url="test2">
							test2
						</LinkedCard>
					</Grid>

					<h2>Projects</h2>

					<p>Dojo is a project consisting of several projects! We are always looking for new contributors.</p>

					<Grid>
						<LinkedCard header={<CardHeader title="test" image={undefined} />} url="test">
							test
						</LinkedCard>
					</Grid>
				</div>
			));
		});
	});
});
