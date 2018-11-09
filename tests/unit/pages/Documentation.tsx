const { describe, it } = intern.getInterface('bdd');
import harness from '@dojo/framework/testing/harness';
import Outlet from '@dojo/framework/routing/Outlet';
import Link from '@dojo/framework/routing/ActiveLink';
import { tsx } from '@dojo/framework/widget-core/tsx';

import Documentation from '../../../src/pages/Documentation';
import * as css from '../../../src/pages/Documentation.m.css';
import list from '../../../src/generated/list';

describe('Documentation', () => {
	it('renders', () => {
		const h = harness(() => <Documentation />);
		h.expect(() => (
			<div classes={[css.root]}>
				{list.map(({ name, path }) => (
					<div key="name">
						<Link key={name} to="tutorial" params={{ tutorial: path }} activeClasses={['active']}>
							{name}
						</Link>
					</div>
				))}
				<Outlet id="tutorial" renderer={() => <div />} />
			</div>
		));
	});
});
