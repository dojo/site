import harness  from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Link from '@dojo/framework/routing/ActiveLink';

const logo = require('../../../src/assets/logo.svg');

import Header from './Header';
import * as css from './Header.m.css';

describe('Menu', () => {
	function getRender() {
		return (
			<header key="root" classes={css.root}>
				<input id="mainMenuToggle" classes={css.mainMenuToggle} type="checkbox"/>
				<div classes={[css.left]}>
					<span classes={css.leftContainer}>
						<label
							for="mainMenuToggle"
							key="toggleButton"
							classes={css.toggleButton}
						>
							<span classes={css.srOnly}>Menu</span>
							<div classes={css.toggleBar} />
						</label>
					</span>
					<span classes={[css.centerContainer]}>
						<Link
							key="homeLink"
							classes={[css.homeLink]}
							to="home"
							activeClasses={[css.selected]}
						>
							<img classes={[css.logo]} alt="logo" src={logo} />
						</Link>
					</span>
					<span classes={[css.rightContainer]} />
				</div>
				<nav
					role="navigation"
					classes={[css.menu]}
					aria-label="Main Menu"
				>
					<ul classes={[css.menuList]}>
						<li classes={[css.menuItem]}>
							<Link
								key="blogLink"
								to="blog"
								classes={[css.link]}
								activeClasses={[css.selected]}
							>
								Blog
							</Link>
						</li>
						<li classes={[css.menuItem]}>
							<Link
								key="tutorialsLink"
								to="tutorials"
								classes={[css.link]}
								activeClasses={[css.selected]}
							>
								Tutorials
							</Link>
						</li>
						<li classes={[css.menuItem]}>
							<Link
								key="reference-guidesLink"
								to="reference-guides"
								classes={[css.link]}
								activeClasses={[css.selected]}
							>
								Reference Guides
							</Link>
						</li>
						<li classes={[css.menuItem]}>
							<Link
								key="examplesLink"
								to="examples"
								classes={[css.link]}
								activeClasses={[css.selected]}
							>
								Examples
							</Link>
						</li>
						<li classes={[css.menuItem]}>
							<Link
								key="playgroundLink"
								to="playground"
								classes={[css.link]}
								activeClasses={[css.selected]}
							>
								Playground
							</Link>
						</li>
						<li classes={[css.menuItem]}>
							<Link
								key="communityLink"
								to="community"
								classes={[css.link]}
								activeClasses={[css.selected]}
							>
								Community
							</Link>
						</li>
					</ul>
				</nav>
			</header>
		);
	}

	it('renders', () => {
		const h = harness(() => <Header />);
		h.expect(() => getRender());
	});
});
