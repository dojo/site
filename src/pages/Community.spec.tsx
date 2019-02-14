import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';

import Grid from '../widgets/grid/Grid';
import LinkedCard from '../widgets/card/LinkedCard';

import Community, { links, projects } from './Community';
import * as css from './Community.m.css';
import CardHeader from '../widgets/card/CardHeader';

describe('Community Page', () => {
	describe('Community', () => {
		it('renders', () => {
			const linkCards = links.map(({ description, title, url, image }) => (
				<LinkedCard header={<CardHeader title={title} image={image} />} url={url}>
				{description}
				</LinkedCard>
			));
			const projectCards = projects.map(({ description, title, url }) => (
				<LinkedCard header={<CardHeader title={title} />} url={url}>
				{description}
				</LinkedCard>
			));
			const h = harness(() => <Community />);
			h.expect(() => (
				<div classes={[css.root]}>
					<h2>Community Links</h2>

					<Grid>{linkCards}</Grid>

					<h2>Projects</h2>

					<p>Dojo is a project consisting of several projects! We are always looking for new contributors.</p>

					<Grid>{projectCards}</Grid>
				</div>
			));
		});
	});
});
