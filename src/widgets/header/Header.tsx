import WidgetBase from '@dojo/framework/core/WidgetBase';
import { tsx } from '@dojo/framework/core/vdom';
import Link from '@dojo/framework/routing/ActiveLink';
import Router from '@dojo/framework/routing/Router';
import Dimensions from '@dojo/framework/core/meta/Dimensions';

const logo = require('../../assets/logo.svg');

import { versions, currentVersion, outlets } from '../../constants';
import { toSlug } from '../../util/to-slug';
import SideMenuItemList from '../menu/SideMenuItemList';
import SideMenuItem from '../menu/SideMenuItem';
import PopupMenuButton from '../popup-menu-button/PopupMenuButton';
import ReferenceGuideMenu from '../../pages/reference-guides/ReferenceGuideMenu';

import * as css from './Header.m.css';

const pages = [
	{
		name: 'Blog',
		requiresStable: true
	},
	{
		name: 'Reference Guides'
	},
	{
		name: 'Examples'
	},
	{
		name: 'Playground'
	},
	{
		name: 'Roadmap',
		requiresStable: true
	},
	{
		name: 'Community',
		requiresStable: true
	}
];

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
		const {
			size: { width }
		} = this.meta(Dimensions).get('root');

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
						{pages.map((page) => {
							let href: string | undefined;
							// Check that the version of the docs is the lastest stable version. If so direct blog, roadmap and community to stable.
							if (currentVersion.current && currentVersion.tag !== 'stable' && page.requiresStable) {
								const hostname = window.location.hostname.split('.');
								if (hostname.length > 2 || (hostname.length === 2 && hostname[1] === 'localhost')) {
									hostname.shift();
								}
								href = `${window.location.protocol}//${hostname.join('.')}${
									location.port ? `:${location.port}` : ''
								}/${toSlug(page.name)}`;
							}
							return [
								page.name === 'Reference Guides' && (
									<SideMenuItem
										name={page.name}
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
									to={href || toSlug(page.name)}
									classes={{
										'dojo.io/SideMenuItem': {
											root: [
												css.menuItem,
												page.name === 'Reference Guides' ? css.noSmallScreen : undefined
											],
											link: [css.link]
										}
									}}
									inverse
								>
									{page.name}
								</SideMenuItem>
							];
						})}
					</SideMenuItemList>
					<PopupMenuButton
						position={width <= 768 ? 'top-left' : 'top-right'}
						items={versions.map((version) => {
							let href: string | undefined = undefined;
							if (!version.current) {
								const hostname = window.location.hostname.split('.');
								if (hostname.length > 2 || (hostname.length === 2 && hostname[1] === 'localhost')) {
									hostname.shift();
								}

								let subdomain = `${version.shortName}.`;
								if (version.tag === 'stable') {
									subdomain = '';
								} else if (version.tag) {
									subdomain = `${version.tag}.`;
								}

								href = `${window.location.protocol}//${subdomain}${hostname.join('.')}${
									location.port ? `:${location.port}` : ''
								}`;
							}
							return {
								title: `${version.tag || version.shortName}${
									version.current ? ` (${version.name})` : ''
								}`,
								href: href,
								linkProperties: href
									? undefined
									: {
											to: outlets.home
									  }
							};
						})}
					>
						{`${currentVersion.tag || currentVersion.shortName} (${currentVersion.name})`}
					</PopupMenuButton>
				</nav>
			</header>
		);
	}
}
