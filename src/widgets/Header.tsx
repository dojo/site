import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import Resize, { ContentRect } from '@dojo/framework/widget-core/meta/Resize';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Link from '@dojo/framework/routing/ActiveLink';

const logo = require('../assets/logo.svg');

import * as css from './Header.m.css';

const pages = ['Blog', 'Documentation', 'Examples', 'Playground', 'Community'];

export default class Menu extends WidgetBase {
	protected expanded = false;

	protected get isSmall(): boolean {
		const { isSmall } = this.meta(Resize).get('root', {
			isSmall: this.smallPredicate
		});

		if (!isSmall) {
			this.expanded = false;
		}

		return isSmall;
	}

	protected smallPredicate(contentRect: ContentRect): boolean {
		return contentRect.width < 768;
	}

	protected toggle() {
		this.expanded = !this.expanded;
		this.invalidate();
	}

	protected close() {
		this.expanded = false;
		this.invalidate();
	}

	protected onKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			this.close();
		}
	}

	protected renderToggleButton(shouldRender: boolean) {
		if (shouldRender) {
			return (
				<button
					key="toggleButton"
					onclick={this.toggle}
					classes={css.toggleButton}
					aria-expanded={this.expanded}
				>
					<span classes={css.srOnly}>Menu</span>
					<div classes={css.toggleBar} />
				</button>
			);
		}
	}

	protected render() {
		const { isSmall, expanded } = this;
		const rootClasses = [css.root];
		isSmall && rootClasses.push(css.responsive);
		expanded && rootClasses.push(css.expanded);
		return (
			<header key="root" classes={rootClasses} onkeydown={this.onKeyDown}>
				<div classes={[css.left]}>
					<span classes={css.toggleButtonContainer}>{this.renderToggleButton(isSmall)}</span>
					<Link key="homeLink" onClick={this.close} to="home" activeClasses={[css.selected]}>
						<img classes={[css.logo]} alt="logo" src={logo} />
					</Link>
				</div>
				<nav role="navigation" classes={[css.menu]} aria-expanded={!isSmall || expanded} aria-label="Main Menu">
					<ul>
						{pages.map((page) => (
							<li classes={[css.menuItem]}>
								<Link
									key={`${page.toLowerCase()}Link`}
									onClick={this.close}
									to={page.toLowerCase()}
									classes={[css.link]}
									activeClasses={[css.selected]}
								>
									{page}
								</Link>
							</li>
						))}
					</ul>
				</nav>
				<div onclick={this.close} classes={[css.backdrop]} tabindex="-1" aria-hidden="true" hidden />
			</header>
		);
	}
}
