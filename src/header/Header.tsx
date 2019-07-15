import WidgetBase from '@dojo/framework/core/WidgetBase';
import { tsx } from '@dojo/framework/core/vdom';
import Link from '@dojo/framework/routing/ActiveLink';
import Router from '@dojo/framework/routing/Router';

const logo = require('../../assets/logo.svg');

import ReferenceGuideMenu from '../reference-guides/ReferenceGuideMenu';
import SideMenuItemList from '../menu/SideMenuItemList';
import SideMenuItem from '../menu/SideMenuItem';
import { toSlug } from '../util/to-slug';

import * as css from './Header.m.css';

const pages = ['Blog', 'Reference Guides', 'Examples', 'Playground', 'Roadmap', 'Community'];

export default class Menu extends WidgetBase {
	protected onAttach() {
		const item = this.registry.getInjector<Router>('router');
		if (item) {
			const router = item.injector();
			router.on('outlet', () => {
				this.invalidate();
			});
		}
	}

	protected render() {
		return (
			<header key="root" classes={css.root}>
				<input id="mainMenuToggle" classes={css.mainMenuToggle} type="checkbox" />
				<div classes={[css.left]}>
					<span classes={css.leftContainer}>
						<label for="mainMenuToggle" key="toggleButton" classes={css.toggleButton}>
							<span classes={css.srOnly}>Menu</span>
							<div classes={css.toggleBar} />
						</label>
					</span>
					<span classes={[css.centerContainer]}>
						<Link key="homeLink" to="home" classes={[css.homeLink]} activeClasses={[css.selected]}>
							<img classes={[css.logo]} alt="logo" src={logo} />
						</Link>
					</span>
					<span classes={[css.rightContainer]} />
				</div>
				<nav role="navigation" classes={[css.menu]} aria-label="Main Menu">
					<SideMenuItemList classes={{ 'dojo.io/SideMenuItemList': { root: [css.menuList] } }}>
						{pages.map((page) => [
							page === 'Reference Guides' && (
								<SideMenuItem
									name={page}
									classes={{
										'dojo.io/SideMenuItem': {
											root: [css.menuItem, css.smallScreenOnly],
											link: [css.link]
										}
									}}
									inverse
								>
									<ReferenceGuideMenu
										name="i18n"
										route="reference-guide-i18n"
										repo="dojo/framework"
										path="docs/:locale:/i18n"
										standaloneMenu={false}
									/>
									<ReferenceGuideMenu
										name="Styling and Theming"
										route="reference-guide-styling-and-theming"
										repo="dojo/framework"
										path="docs/:locale:/styling-and-theming"
										standaloneMenu={false}
									/>
									<ReferenceGuideMenu
										name="Routing"
										route="reference-guide-routing"
										repo="dojo/framework"
										path="docs/:locale:/routing"
										standaloneMenu={false}
									/>
								</SideMenuItem>
							),
							<SideMenuItem
								to={toSlug(page)}
								classes={{
									'dojo.io/SideMenuItem': {
										root: [
											css.menuItem,
											page === 'Reference Guides' ? css.noSmallScreen : undefined
										],
										link: [css.link]
									}
								}}
								inverse
							>
								{page}
							</SideMenuItem>
						])}
					</SideMenuItemList>
				</nav>
			</header>
		);
	}
}
