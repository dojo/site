import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import icache from '@dojo/framework/core/middleware/icache';
import Link from '../link/ActiveLink';

const logo = require('../assets/logo.svg');

import * as css from './Header.m.css';

const menuItems = ['Blog', 'Learn', 'Examples', 'Playground', 'Roadmap'];

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
						<img classes={[themedCss.logo]} alt="logo" src={logo} />
					</Link>
				</span>
				<span classes={[themedCss.rightContainer]} />
			</div>
			<nav role="navigation" classes={[themedCss.menu]} aria-label="Main Menu">
				<ul classes={themedCss.menuList}>
					{menuItems.map((item) => {
						return (
							<li classes={themedCss.menuItem}>
								<Link
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
				<a href="https://github.com/dojo/framework" target="_blank" classes={themedCss.iconLink}>
					<img alt="dojo/framework" src="/assets/github-mark-light.png" />
				</a>
			</nav>
		</header>
	);
});
