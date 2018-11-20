import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Link from '@dojo/framework/routing/ActiveLink';

const logo = require('../assets/logo.svg');

import Header from './Header';
import * as css from './Header.m.css';

describe('Header', () => {
	it('renders', () => {
		const h = harness(() => <Header />);
		h.expect(() => (
			<div classes={css.root}>
				<div classes={css.menu}>
					<div classes={css.left}>
						<Link to="home" activeClasses={[css.selected]}>
							<img classes={[css.logo]} alt="logo" src={logo} />
						</Link>
					</div>
					<div classes={[css.menuItem]}>
						<Link to="blog" classes={[css.link]} activeClasses={[css.selected]}>
							Blog
						</Link>
					</div>
					<div classes={[css.menuItem]}>
						<Link to="tutorials" classes={[css.link]} activeClasses={[css.selected]}>
							Tutorials
						</Link>
					</div>
					<div classes={[css.menuItem]}>
						<Link to="examples" classes={[css.link]} activeClasses={[css.selected]}>
							Examples
						</Link>
					</div>
					<div classes={[css.menuItem]}>
						<Link to="playground" classes={[css.link]} activeClasses={[css.selected]}>
							Playground
						</Link>
					</div>
					<div classes={[css.menuItem]}>
						<Link to="community" classes={[css.link]} activeClasses={[css.selected]}>
							Community
						</Link>
					</div>
				</div>
			</div>
		));
	});
});
