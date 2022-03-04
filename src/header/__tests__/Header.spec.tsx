import assertionTemplate from '@dojo/framework/testing/harness/assertionTemplate';
import harness from '@dojo/framework/testing/harness/harness';
import { tsx } from '@dojo/framework/core/vdom';
import Link from '@dojo/framework/routing/ActiveLink';

const logo = require('../../assets/logo.svg');

import * as css from '../Header.m.css';
import Header from '../Header';
import bundle from '../Header.nls';

const messages = bundle.messages;

describe('Header', () => {
	const noop = () => {};
	const baseAssertion = assertionTemplate(() => (
		<header key="root" classes={css.root}>
			<input id="mainMenuToggle" onclick={noop} classes={css.mainMenuToggle} type="checkbox" checked={false} />
			<div classes={[css.left]}>
				<span classes={css.leftContainer}>
					<label for="mainMenuToggle" key="toggleButton" classes={css.toggleButton}>
						<span classes={css.srOnly}>Menu</span>
						<div classes={css.toggleBar} />
					</label>
				</span>
				<span classes={[css.centerContainer]}>
					<Link
						key="homeLink"
						to="home"
						onClick={noop}
						classes={[css.homeLink]}
						matchParams={{}}
						activeClasses={[css.selected]}
					>
						<img classes={[css.logo]} alt="dojo dragon main logo" src={logo} />
					</Link>
				</span>
				<span classes={[css.rightContainer]} />
			</div>
			<nav role="navigation" classes={[css.menu]} aria-label="Main Menu">
				<ul classes={css.menuList}>
					<li classes={[css.menuItem, false]}>
						<Link
							key="Blog"
							classes={css.menuLink}
							onClick={noop}
							to="blog"
							matchParams={{}}
							params={{}}
							activeClasses={[css.selected]}
						>
							Blog
						</Link>
					</li>
					<li classes={[css.menuItem, false]}>
						<Link
							key="Learn"
							classes={css.menuLink}
							onClick={noop}
							to="learn"
							matchParams={{}}
							params={{ guide: 'overview', page: 'introduction' }}
							activeClasses={[css.selected]}
						>
							Learn
						</Link>
					</li>
					<li classes={[css.menuItem, css.playgroundMenuItem]}>
						<Link
							key="Playground"
							classes={css.menuLink}
							onClick={noop}
							to="playground"
							matchParams={{}}
							params={{}}
							activeClasses={[css.selected]}
						>
							Playground
						</Link>
					</li>
					<li classes={[css.menuItem, false]}>
						<Link
							key="Roadmap"
							classes={css.menuLink}
							onClick={noop}
							to="roadmap"
							matchParams={{}}
							params={{}}
							activeClasses={[css.selected]}
						>
							Roadmap
						</Link>
					</li>
					<li classes={[css.menuItem]}>
						<a classes={css.menuLink} target="_blank" href="https://v7.widgets.dojo.io">
							{messages.widgets}
						</a>
					</li>
				</ul>
			</nav>
			<a
				href="https://github.com/dojo/framework"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Github"
				classes={css.iconLink}
			>
				<svg style="fill: white;" height="28px" viewBox="0 0 16 16" version="1.1" width="28" aria-hidden="true">
					<path
						fill-rule="evenodd"
						d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
					></path>
				</svg>
			</a>
		</header>
	));

	it('renders', () => {
		const h = harness(() => <Header />);
		h.expect(baseAssertion);
	});

	it('opens and closes menu', () => {
		const h = harness(() => <Header />);
		h.expect(baseAssertion);

		h.trigger('#mainMenuToggle', 'onclick');
		h.expect(baseAssertion.setProperty('#mainMenuToggle', 'checked', true));

		h.trigger('@Learn', 'onClick');
		h.expect(baseAssertion);

		h.trigger('#mainMenuToggle', 'onclick');
		h.expect(baseAssertion.setProperty('#mainMenuToggle', 'checked', true));

		h.trigger('@homeLink', 'onClick');
		h.expect(baseAssertion);
	});
});
