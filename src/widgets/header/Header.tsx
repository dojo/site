import WidgetBase from '@dojo/framework/core/WidgetBase';
import { tsx } from '@dojo/framework/core/vdom';
import Link from '@dojo/framework/routing/ActiveLink';
import Router from '@dojo/framework/routing/Router';
import I18nMixin from '@dojo/framework/core/mixins/I18n';

const logo = require('../../assets/logo.svg');

import { ReferenceGuide } from '../../interface';
import { toSlug } from '../../util/to-slug';
import SideMenuItemList from '../menu/SideMenuItemList';
import SideMenuItem from '../menu/SideMenuItem';

import ReferenceGuideMenu from '../../pages/reference-guides/ReferenceGuideMenu';
import referenceGuideBundle from '../../pages/reference-guides/ReferenceGuides.nls';

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

export interface HeaderProperties {
	referenceGuides: ReferenceGuide[];
}

export default class Header extends I18nMixin(WidgetBase)<HeaderProperties> {
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
		const { referenceGuides } = this.properties;
		const { messages: referenceGuideMessages } = this.localizeBundle(referenceGuideBundle);

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
										{referenceGuides.map((referenceGuide) => {
											const {
												to,
												name,
												path,
												repository: { name: repo, branch }
											} = referenceGuide;
											return (
												<ReferenceGuideMenu
													name={referenceGuideMessages[name]}
													route={to}
													repo={repo}
													branch={branch}
													path={path}
													standaloneMenu={false}
												/>
											);
										})}
									</SideMenuItem>
								),
								<SideMenuItem
									to={toSlug(page.name)}
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
				</nav>
			</header>
		);
	}
}
