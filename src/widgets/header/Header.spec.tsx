import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';
import Link from '@dojo/framework/routing/ActiveLink';
import Registry from '@dojo/framework/core/Registry';
import Router from '@dojo/framework/routing/Router';
import { MemoryHistory } from '@dojo/framework/routing/history/MemoryHistory';
import assertionTemplate from '@dojo/framework/testing/assertionTemplate';

const logo = require('../../../src/assets/logo.svg');

import * as constants from '../../constants';
import SideMenuItem from '../menu/SideMenuItem';
import SideMenuItemList from '../menu/SideMenuItemList';
import PopupMenuButton from '../popup-menu-button/PopupMenuButton';
import ReferenceGuideMenu from '../../pages/reference-guides/ReferenceGuideMenu';

import { mockWindow } from '../../test/util/MockWindow';

import Header from './Header';
import * as css from './Header.m.css';

const registry = new Registry();

const router = new Router(
	[
		{
			path: 'foo',
			outlet: 'foo',
			children: [
				{
					path: 'bar',
					outlet: 'bar'
				}
			]
		},
		{
			path: 'other',
			outlet: 'other'
		},
		{
			path: 'param',
			outlet: 'param',
			children: [
				{
					path: '{suffix}',
					outlet: 'suffixed-param'
				}
			]
		}
	],
	{ HistoryManager: MemoryHistory }
);

registry.defineInjector('router', () => () => router);

describe('Menu', () => {
	(constants as any).versions = [
		{
			name: '7.0.0',
			shortName: 'v7',
			tag: 'next'
		},
		constants.currentVersion,
		{
			name: '5.0.0',
			shortName: 'v5'
		}
	];

	const baseAssertion = assertionTemplate(() => (
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
					<Link key="homeLink" classes={[css.homeLink]} to="home" activeClasses={[css.selected]}>
						<img classes={[css.logo]} alt="logo" src={logo} />
					</Link>
				</span>
				<span classes={[css.rightContainer]} />
			</div>
			<nav role="navigation" classes={[css.menu]} aria-label="Main Menu">
				<SideMenuItemList classes={{ 'dojo.io/SideMenuItemList': { root: [css.menuList] } }}>
					<SideMenuItem
						assertion-key="blog"
						to="blog"
						classes={{ 'dojo.io/SideMenuItem': { root: [css.menuItem, undefined], link: [css.link] } }}
						inverse
					>
						Blog
					</SideMenuItem>
					<SideMenuItem
						name="Reference Guides"
						classes={{
							'dojo.io/SideMenuItem': { root: [css.menuItem, css.smallScreenOnly], link: [css.link] }
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
					<SideMenuItem
						to="reference-guides"
						classes={{
							'dojo.io/SideMenuItem': { root: [css.menuItem, css.noSmallScreen], link: [css.link] }
						}}
						inverse
					>
						Reference Guides
					</SideMenuItem>
					<SideMenuItem
						to="examples"
						classes={{ 'dojo.io/SideMenuItem': { root: [css.menuItem, undefined], link: [css.link] } }}
						inverse
					>
						Examples
					</SideMenuItem>
					<SideMenuItem
						to="playground"
						classes={{ 'dojo.io/SideMenuItem': { root: [css.menuItem, undefined], link: [css.link] } }}
						inverse
					>
						Playground
					</SideMenuItem>
					<SideMenuItem
						assertion-key="roadmap"
						to="roadmap"
						classes={{ 'dojo.io/SideMenuItem': { root: [css.menuItem, undefined], link: [css.link] } }}
						inverse
					>
						Roadmap
					</SideMenuItem>
					<SideMenuItem
						assertion-key="community"
						to="community"
						classes={{ 'dojo.io/SideMenuItem': { root: [css.menuItem, undefined], link: [css.link] } }}
						inverse
					>
						Community
					</SideMenuItem>
				</SideMenuItemList>
				<PopupMenuButton
					assertion-key="version-selector"
					position={'top-left'}
					items={[
						{
							title: 'next',
							href: 'http://next.localhost',
							linkProperties: undefined
						},
						{
							title: 'stable (6.0.0)',
							href: 'undefined',
							linkProperties: {
								to: 'home'
							}
						},
						{
							title: 'v5',
							href: 'http://v5.localhost',
							linkProperties: undefined
						}
					]}
				>
					{`stable (6.0.0)`}
				</PopupMenuButton>
			</nav>
		</header>
	));

	it('renders', () => {
		const h = harness(() => <Header />);

		h.expect(baseAssertion);
	});

	it('renders for https and a port', () => {
		const { assign } = mockWindow('https://localhost:9999').location;

		const h = harness(() => <Header />);

		h.expect(
			baseAssertion.setProperty('~version-selector', 'items', [
				{
					title: 'next',
					href: 'https://next.localhost:9999',
					linkProperties: undefined
				},
				{
					title: 'stable (6.0.0)',
					href: 'undefined',
					linkProperties: {
						to: 'home'
					}
				},
				{
					title: 'v5',
					href: 'https://v5.localhost:9999',
					linkProperties: undefined
				}
			])
		);

		assign.mockRestore();
	});

	it('renders for non-stable version', () => {
		const { assign } = mockWindow('http://v5.localhost').location;
		(constants as any).versions = [
			{
				name: '7.0.0',
				shortName: 'v7',
				tag: 'next'
			},
			{
				name: '6.0.0',
				shortName: 'v6',
				tag: 'stable'
			},
			{
				name: '5.0.0',
				shortName: 'v5',
				current: true
			}
		];
		(constants as any).currentVersion = constants.versions[2];

		const h = harness(() => <Header />);

		h.expect(
			baseAssertion
				.setProperty('~version-selector', 'items', [
					{
						title: 'next',
						href: 'http://next.localhost',
						linkProperties: undefined
					},
					{
						title: 'stable',
						href: 'http://localhost',
						linkProperties: undefined
					},
					{
						title: 'v5 (5.0.0)',
						href: 'undefined',
						linkProperties: {
							to: 'home'
						}
					}
				])
				.setChildren('~version-selector', () => ['v5 (5.0.0)'])
				.setProperty('~community', 'to', 'http://localhost/community')
				.setProperty('~roadmap', 'to', 'http://localhost/roadmap')
				.setProperty('~blog', 'to', 'http://localhost/blog')
		);

		assign.mockRestore();
	});
});
