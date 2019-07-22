import { tsx, create, invalidator } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import injector from '@dojo/framework/core/middleware/injector';
import cache from '@dojo/framework/core/middleware/cache';
import Link from '@dojo/framework/routing/ActiveLink';
import Router from '@dojo/framework/routing/Router';

const logo = require('../assets/logo.svg');

import ReferenceGuideMenu from '../reference-guides/ReferenceGuideMenu';
import SideMenuItemList from '../menu/SideMenuItemList';
import SideMenuItem from '../menu/SideMenuItem';
import { toSlug } from '../util/to-slug';

import * as css from './Header.m.css';

const pages = ['Blog', 'Reference Guides', 'Examples', 'Playground', 'Roadmap', 'Community'];

const factory = create({ theme, injector, cache });

export default factory(function Header({ middleware: { theme, injector, cache } }) {
	const themedCss = theme.classes(css);

	const attached = cache.get<boolean>('attached');
	if (!attached) {
		const router = injector.get<Router>('router');
		if (router) {
			router.on('outlet', () => {
				invalidator();
			});
		}
	}

	return (
		<header key="root" classes={themedCss.root}>
			<input id="mainMenuToggle" classes={themedCss.mainMenuToggle} type="checkbox" />
			<div classes={[themedCss.left]}>
				<span classes={themedCss.leftContainer}>
					<label for="mainMenuToggle" key="toggleButton" classes={themedCss.toggleButton}>
						<span classes={themedCss.srOnly}>Menu</span>
						<div classes={themedCss.toggleBar} />
					</label>
				</span>
				<span classes={[themedCss.centerContainer]}>
					<Link key="homeLink" to="home" classes={[themedCss.homeLink]} activeClasses={[themedCss.selected]}>
						<img classes={[themedCss.logo]} alt="logo" src={logo} />
					</Link>
				</span>
				<span classes={[themedCss.rightContainer]} />
			</div>
			<nav role="navigation" classes={[themedCss.menu]} aria-label="Main Menu">
				<SideMenuItemList classes={{ 'dojo.io/SideMenuItemList': { root: [themedCss.menuList] } }}>
					{pages.map((page) => [
						page === 'Reference Guides' && (
							<SideMenuItem
								name={page}
								classes={{
									'dojo.io/SideMenuItem': {
										root: [themedCss.menuItem, themedCss.smallScreenOnly],
										link: [themedCss.link]
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
										themedCss.menuItem,
										page === 'Reference Guides' ? themedCss.noSmallScreen : undefined
									],
									link: [themedCss.link]
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
});
