import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Link from '@dojo/framework/routing/ActiveLink';

const logo = require('../assets/logo.svg');

import * as css from './Menu.m.css';

const pages = [
	'Blog',
	'Documentation',
	'Examples',
	'Playground',
	'Community'
];

export default class Menu extends WidgetBase {
	protected render() {
		return (
			<div classes={css.root}>
				<div classes={css.menu}>
					<div classes={css.left}>
						<Link to='home' activeClasses={[css.selected]}>
							<img classes={[css.logo]} alt='logo' src={logo} />
						</Link>
					</div>
					{ pages.map((page) => (
						<div classes={[css.menuItem]}>
							<Link to={ page.toLowerCase() } classes={[css.link]} activeClasses={[css.selected]}>
								{ page }
							</Link>
						</div>
					)) }
				</div>
			</div>
		);
	}
}
