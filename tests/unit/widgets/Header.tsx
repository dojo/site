const { describe, it } = intern.getInterface('bdd');
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Link from '@dojo/framework/routing/ActiveLink';

const logo = require('../../../src/assets/logo.svg');

import Header from '../../../src/widgets/Header';
import * as css from '../../../src/widgets/Header.m.css';

function getRender(responsive: boolean = false, expanded: boolean = false) {
	const rootClasses = [];
	responsive && rootClasses.push(css.responsive);
	expanded && rootClasses.push(css.expanded);
	return (
		<header key="root" onkeydown={() => {}} classes={[css.root, ...rootClasses]}>
			<div classes={[css.left]}>
				<span classes={css.toggleButtonContainer}>
					{responsive ? (
						<button
							key="toggleButton"
							onclick={() => {}}
							classes={css.toggleButton}
							aria-expanded={expanded}
						>
							<span classes={css.srOnly}>Menu</span>
							<div classes={css.toggleBar} />
						</button>
					) : (
						undefined
					)}
				</span>
				<Link onClick={() => {}} to="home" activeClasses={[css.selected]}>
					<img classes={[css.logo]} alt="logo" src={logo} />
				</Link>
			</div>
			<nav role="navigation" classes={[css.menu]} aria-expanded={!responsive || expanded} aria-label="Main Menu">
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
	);
}

describe('Menu', () => {
	it('renders', () => {
		const h = harness(() => <Header />);
		h.expect(() => getRender());
	});

	describe('responsive mode', () => {
		class SmallHeader extends Header {
			protected get isSmall() {
				return true;
			}
		}

		it('renders with the responsive class when isSmall is true', () => {
			const h = harness(() => <SmallHeader />);
			h.expect(() => getRender(true));
		});

		it('adds the expanded class when triggered', () => {
			const h = harness(() => <SmallHeader />);
			h.trigger('@toggleButton', 'onclick');
			h.expect(() => getRender(true, true));
		});
	});
});
