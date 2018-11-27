const { describe, it } = intern.getInterface('bdd');
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';

import Community, { Card } from '../../../src/pages/Community';
import * as css from '../../../src/pages/Community.m.css';

describe('Community Page', () => {
	describe('Card', () => {
		it('renders with all properties', () => {
			const h = harness(() => <Card title="test" url="test" image="test" imageAlt="test" description="test" />);
			h.expect(() => (
				<div classes={[css.card]}>
					<div classes={[css.header]}>
						<a href="test">
							<img src="test" alt="test" />
							<h3>test</h3>
						</a>
					</div>
					<p>test</p>
				</div>
			));
		});

		it('renders without image if missing', () => {
			const h = harness(() => <Card title="test" url="test" description="test" />);
			h.expect(() => (
				<div classes={[css.card]}>
					<div classes={[css.header]}>
						<a href="test">
							<h3>test</h3>
						</a>
					</div>
					<p>test</p>
				</div>
			));
		});
	});

	describe('Community', () => {
		it('renders', () => {
			const links = [
				{ title: 'test', url: 'test', image: 'test', imageAlt: 'test', description: 'test' },
				{ title: 'test2', url: 'test2', image: 'test2', description: 'test2' }
			];
			const projects = [{ title: 'test', url: 'test', description: 'test' }];
			const h = harness(() => <Community links={links} projects={projects} />);
			h.expect(() => (
				<div classes={[css.root]}>
					<h2>Community Links</h2>

					<div classes={[css.cards]}>
						<Card title="test" url="test" image="test" imageAlt="test" description="test" />
						<Card title="test2" url="test2" image="test2" imageAlt={undefined} description="test2" />
					</div>

					<h2>Projects</h2>

					<p>Dojo is a project consisting of several projects! We are always looking for new contributors.</p>

					<div classes={[css.cards]}>
						<Card title="test" url="test" image={undefined} imageAlt={undefined} description="test" />
					</div>
				</div>
			));
		});
	});
});
