import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Link from '@dojo/framework/routing/ActiveLink';

const logo = require('../assets/logo.svg');

import * as css from './Header.m.css';

const pages = ['Blog', 'Tutorials', 'Reference Guides', 'Examples', 'Playground', 'Community'];

export default class Menu extends WidgetBase {
	// protected expanded = false;

	// private smallPredicate(contentRect: ContentRect): boolean {
	// 	return contentRect.width < 768;
	// }

	// private toggle() {
	// 	this.expanded = !this.expanded;
	// 	this.invalidate();
	// }

	// private close() {
	// 	this.expanded = false;
	// 	this.invalidate();
	// }

	// private onKeyDown(event: KeyboardEvent) {
	// 	if (event.key === 'Escape') {
	// 		this.close();
	// 	}
	// }

	protected render() {
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
							to="home"
							classes={[css.homeLink]}
							activeClasses={[css.selected]}
						>
							<img classes={[css.logo]} alt="logo" src={logo} />
						</Link>
					</span>
					<span classes={[css.rightContainer]} />
				</div>
				<nav role="navigation" classes={[css.menu]} aria-label="Main Menu">
					<ul classes={[css.menuList]}>
						{pages.map((page) => (
							<li classes={[css.menuItem]}>
								<Link
									key={`${page.toLowerCase().replace(' ', '-')}Link`}
									to={page.toLowerCase().replace(' ', '-')}
									classes={[css.link]}
									activeClasses={[css.selected]}
								>
									{page}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</header>
		);
	}
}
