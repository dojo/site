const { beforeEach, describe, it } = intern.getInterface('bdd');
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Link from '@dojo/framework/routing/ActiveLink';

import { Constructor, WidgetMetaBase, WidgetMetaConstructor } from '@dojo/framework/widget-core/interfaces';
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { stub, SinonStub } from 'sinon';
import Resize from '@dojo/framework/widget-core/meta/Resize';
import { w } from '@dojo/framework/widget-core/d';

const logo = require('../../../src/assets/logo.svg');

import Header from '../../../src/widgets/Header';
import * as css from '../../../src/widgets/Header.m.css';

function MockMetaMixin<T extends Constructor<WidgetBase<any>>>(Base: T, mockStub: SinonStub): T {
	return class extends Base {
		protected meta<T extends WidgetMetaBase>(MetaType: WidgetMetaConstructor<T>): T {
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
					<Link key="homeLink" onClick={() => {}} to="home" activeClasses={[css.selected]}>
						<img classes={[css.logo]} alt="logo" src={logo} />
					</Link>
				</div>
				<nav
					role="navigation"
					classes={[css.menu]}
					aria-expanded={!responsive || expanded}
					aria-label="Main Menu"
				>
					<ul>
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
								key="documentationLink"
								onClick={() => {}}
								to="documentation"
								classes={[css.link]}
								activeClasses={[css.selected]}
							>
								Documentation
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
		let mockMeta: SinonStub;
		beforeEach(() => {
			mockMeta = stub();
			mockMeta.withArgs(Resize).returns({
				get: () => ({
					isSmall: (Header.prototype as any).smallPredicate({ width: resizeValue })
				})
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
			// trigger opening
			h.trigger('@toggleButton', 'onclick');
			h.expect(() => getRender(true, true));

			// trigger closing
			h.trigger('@toggleButton', 'onclick');
			h.expect(() => getRender(true, false));
		});

		it('closes when the close event is triggered', () => {
			const h = harness(() => <SmallHeader />);
			// trigger opening
			h.trigger('@toggleButton', 'onclick');
			h.expect(() => getRender(true, true));

			// trigger close
			h.trigger('@homeLink', 'onClick');
			h.expect(() => getRender(true, false));
		});

		it('closes when Escape is pressed', () => {
			const h = harness(() => <SmallHeader />);
			// trigger opening
			h.trigger('@toggleButton', 'onclick');
			h.expect(() => getRender(true, true));

			// trigger any other key down
			h.trigger('@root', 'onkeydown', { key: ' ' });
			h.expect(() => getRender(true, true));

			// trigger close via escape
			h.trigger('@root', 'onkeydown', { key: 'Escape' });
			h.expect(() => getRender(true, false));
		});
	});
});
