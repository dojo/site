import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import icache from '@dojo/framework/core/middleware/icache';
import Link from '../link/ActiveLink';

const logo = require('../assets/logo.svg');

import * as css from './Header.m.css';

const menuItems = ['Blog', 'Learn', 'Playground', 'Roadmap'];

const factory = create({ theme, icache });

export default factory(function Header({ middleware: { theme, icache } }) {
	const themedCss = theme.classes(css);
	const open = icache.get<boolean>('open') || false;

	return (
		<header key="root" classes={themedCss.root}>
			<input
				id="mainMenuToggle"
				onclick={() => {
					icache.set('open', true);
				}}
				classes={themedCss.mainMenuToggle}
				type="checkbox"
				checked={open}
			/>
			<div classes={[themedCss.left]}>
				<span classes={themedCss.leftContainer}>
					<label for="mainMenuToggle" key="toggleButton" classes={themedCss.toggleButton}>
						<span classes={themedCss.srOnly}>Menu</span>
						<div classes={themedCss.toggleBar} />
					</label>
				</span>
				<span classes={[themedCss.centerContainer]}>
					<Link
						key="homeLink"
						to="home"
						onClick={() => {
							icache.set('open', false);
						}}
						classes={[themedCss.homeLink]}
						matchParams={{}}
						activeClasses={[themedCss.selected]}
					>
						<img classes={[themedCss.logo]} alt="dojo dragon main logo" src={logo} />
					</Link>
				</span>
				<span classes={[themedCss.rightContainer]} />
			</div>
			<nav role="navigation" classes={[themedCss.menu]} aria-label="Main Menu">
				<ul classes={themedCss.menuList}>
					{menuItems.map((item) => {
						return (
							<li classes={[themedCss.menuItem, item === 'Playground' && themedCss.playgroundMenuItem]}>
								<Link
									key={item}
									classes={css.menuLink}
									onClick={() => {
										icache.set('open', false);
									}}
									to={item.toLowerCase()}
									matchParams={{}}
									params={
										item.toLowerCase() === 'learn'
											? { guide: 'overview', page: 'introduction' }
											: {}
									}
									activeClasses={[themedCss.selected]}
								>
									{item}
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
			<a
				href="https://github.com/dojo/framework"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Github"
				classes={themedCss.iconLink}
			>
				<svg style="fill: white;" height="28px" viewBox="0 0 16 16" version="1.1" width="28" aria-hidden="true">
					<path
						fill-rule="evenodd"
						d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
					></path>
				</svg>
			</a>
		</header>
	);
});
