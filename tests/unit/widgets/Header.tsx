const { describe, it } = intern.getInterface('bdd');
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Link from '@dojo/framework/routing/ActiveLink';

const logo = require('../../../src/assets/logo.svg');

import Header from '../../../src/widgets/Header';
import * as css from '../../../src/widgets/Header.m.css';

describe('Menu', () => {
	it('renders', () => {
		const h = harness(() => <Header />);
		h.expect(() => (
			<header key="root" classes={[css.root]}>
				<div classes={[css.left]}>
					<span classes={css.toggleButtonContainer}>
					</span>
					<Link onClick={() => {}} to="home" activeClasses={[css.selected]}>
						<img classes={[css.logo]} alt="logo" src={logo} />
					</Link>
				</div>
				<nav role="navigation" classes={[css.menu]} aria-expanded={true} aria-label="Main Menu">
					<ul>
						<li classes={[css.menuItem]}>
							<Link onClick={() => {}} to="blog" classes={[css.link]} activeClasses={[css.selected]}>
								Blog
							</Link>
						</li>
						<li classes={[css.menuItem]}>
							<Link onClick={() => {}} to="documentation" classes={[css.link]} activeClasses={[css.selected]}>
								Documentation
							</Link>
						</li>
						<li classes={[css.menuItem]}>
							<Link onClick={() => {}} to="examples" classes={[css.link]} activeClasses={[css.selected]}>
								Examples
							</Link>
						</li>
						<li classes={[css.menuItem]}>
							<Link onClick={() => {}} to="playground" classes={[css.link]} activeClasses={[css.selected]}>
								Playground
							</Link>
						</li>
						<li classes={[css.menuItem]}>
							<Link onClick={() => {}} to="community" classes={[css.link]} activeClasses={[css.selected]}>
								Community
							</Link>
						</li>
					</ul>
				</nav>
				<div onclick={() => {}} classes={[css.backdrop]} tabindex="-1" aria-hidden="true" hidden />
			</header>
		));
	});
});
