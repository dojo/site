import WidgetBase from '@dojo/framework/core/WidgetBase';
import { DNode } from '@dojo/framework/core/interfaces';
import { ThemedMixin, theme } from '@dojo/framework/core/mixins/Themed';
import { tsx } from '@dojo/framework/core/vdom';
import Focus from '@dojo/framework/core/meta/Focus';
import { LinkProperties } from '@dojo/framework/routing/interfaces';
import watch from '@dojo/framework/core/decorators/watch';

import AccessibilityLinkButton from '../accessibility-link-button/AccessibilityLinkButton';

import * as css from './PopupMenu.m.css';

export interface PopupMenuItem {
	title: string | DNode;
	sectionHeader?: boolean;
	onClick?: () => void;
	linkProperties?: LinkProperties;
	href?: string;
}

export interface PopupMenuPositioning {
	top?: number;
	right?: number;
	left?: number;
	bottom?: number;
}

export interface PopupMenuProperties {
	items: PopupMenuItem[];
	position?: PopupMenuPositioning;
	onFocus?: () => void;
	onBlur?: () => void;
}

@theme(css)
export default class PopupMenu extends ThemedMixin(WidgetBase)<PopupMenuProperties> {
	private hasHadFocus = false;
	@watch() private forceClose = false;

	private onBlur() {
		const { onBlur } = this.properties;
		this.hasHadFocus = false;
		onBlur && onBlur();
	}

	protected render(): DNode {
		const { items, position = {}, onFocus } = this.properties;

		const classes = [css.root];

		let styles = {
			top: typeof position.top !== 'undefined' ? `${position.top}px` : undefined,
			right: typeof position.right !== 'undefined' ? `${position.right}px` : undefined,
			left: typeof position.left !== 'undefined' ? `${position.left}px` : undefined,
			bottom: typeof position.bottom !== 'undefined' ? `${position.bottom}px` : undefined
		};

		if (this.forceClose) {
			this.forceClose = false;
			this.onBlur();
		} else {
			const { active, containsFocus } = this.meta(Focus).get('popupMenu');
			if (active || containsFocus) {
				if (!this.hasHadFocus) {
					onFocus && onFocus();
				}
				this.hasHadFocus = true;
			} else if (this.hasHadFocus) {
				this.onBlur();
			}
		}

		return (
			<div styles={styles} classes={this.theme(classes)} tabindex="-1" key="popupMenu" focus={true}>
				{items.map((item: PopupMenuItem) => {
					if (item.sectionHeader) {
						return <div classes={this.theme(css.sectionHeader)}>{item.title}</div>;
					}

					if (item.linkProperties) {
						const onClick = item.linkProperties.onClick;
						item.linkProperties.onClick = (event) => {
							onClick && onClick(event);
							this.forceClose = true;
						};
					}

					return (
						<AccessibilityLinkButton
							classes={{
								'dojo.io/AccessibilityLinkButton': {
									root: this.theme([css.item])
								}
							}}
							onClick={() => {
								item.onClick && item.onClick();
								this.forceClose = true;
							}}
							linkProperties={item.linkProperties}
							href={item.href}
						>
							{item.title}
						</AccessibilityLinkButton>
					);
				})}
			</div>
		);
	}
}
