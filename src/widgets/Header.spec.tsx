import harness, { HarnessAPI } from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Link from '@dojo/framework/routing/ActiveLink';

import { Constructor, MetaBase, WidgetMetaConstructor } from '@dojo/framework/widget-core/interfaces';
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { w } from '@dojo/framework/widget-core/d';

const logo = require('../../../src/assets/logo.svg');

import Header from './Header';
import * as css from './Header.m.css';

function MockMetaMixin<T extends Constructor<WidgetBase<any>>>(Base: T, mockStub: jest.Mock): T {
	return class extends Base {
		protected meta<T extends MetaBase>(MetaType: WidgetMetaConstructor<T>): T {
			return mockStub(MetaType);
		}
	};
}

describe('Menu', () => {
	function getRender(responsive: boolean = false, expanded: boolean = false) {
		const rootClasses = [];
		responsive && rootClasses.push(css.responsive);
		expanded && rootClasses.push(css.expanded);
		return (
			<header key="root" onkeydown={() => {}} classes={[css.root, ...rootClasses]}>
				<div classes={[css.left]}>
					<span classes={css.leftContainer}>
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
					<span classes={[css.centerContainer]}>
						<Link
							key="homeLink"
							classes={[css.homeLink]}
							onClick={() => {}}
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
					aria-expanded={!responsive || expanded}
					aria-label="Main Menu"
				>
					<ul classes={[css.menuList]}>
						<li classes={[css.menuItem]}>
							<Link
								key="blogLink"
								onClick={() => {}}
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
								onClick={() => {}}
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
								onClick={() => {}}
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
								onClick={() => {}}
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
								onClick={() => {}}
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
								onClick={() => {}}
								to="community"
								classes={[css.link]}
								activeClasses={[css.selected]}
							>
								Community
							</Link>
						</li>
					</ul>
				</nav>
				<div onclick={() => {}} classes={[css.backdrop]} tabindex="-1" aria-hidden="true" hidden />
			</header>
		);
	}

	it('renders', () => {
		const h = harness(() => <Header />);
		h.expect(() => getRender());
	});

	describe('resizing predicate', () => {
		let resizeValue: number;
		let mockMeta: jest.Mock;
		beforeEach(() => {
			mockMeta = jest.fn().mockImplementation(() => {
				return {
					get: () => ({
						isSmall: (Header.prototype as any).smallPredicate({ width: resizeValue })
					})
				};
			});
		});

		it('should not apply the "responsive" class when larger than 768', () => {
			resizeValue = 900;
			const h = harness(() => w(MockMetaMixin(Header, mockMeta), {}));
			h.expect(() => getRender(false));
		});

		it('should apply the "responsive" class when smaller than 768', () => {
			resizeValue = 500;
			const h = harness(() => w(MockMetaMixin(Header, mockMeta), {}));
			h.expect(() => getRender(true));
		});
	});

	describe('responsive mode', () => {
		let mockMeta: jest.Mock;
		let h: HarnessAPI;

		beforeEach(() => {
			mockMeta = jest.fn().mockImplementation(() => {
				return {
					get: () => ({
						isSmall: () => true
					})
				};
			});
			h = harness(() => w(MockMetaMixin(Header, mockMeta), {}));
		});

		it('adds the expanded class when triggered', () => {
			// trigger opening
			h.trigger('@toggleButton', 'onclick');
			h.expect(() => getRender(true, true));

			// trigger closing
			h.trigger('@toggleButton', 'onclick');
			h.expect(() => getRender(true, false));
		});

		it('closes when the close event is triggered', () => {
			// trigger opening
			h.trigger('@toggleButton', 'onclick');
			h.expect(() => getRender(true, true));

			// trigger close
			h.trigger('@homeLink', 'onClick');
			h.expect(() => getRender(true, false));
		});

		it('closes when Escape is pressed', () => {
			// trigger opening
			h.trigger('@toggleButton', 'onclick');
			h.expect(() => getRender(true, true));

			// trigger any other key down
			h.trigger('@root', 'onkeydown', { key: 'x' });
			h.expect(() => getRender(true, true));

			// trigger close via escape
			h.trigger('@root', 'onkeydown', { key: 'Escape' });
			h.expect(() => getRender(true, false));
		});
	});
});
