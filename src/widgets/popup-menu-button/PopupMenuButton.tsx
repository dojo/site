import WidgetBase from '@dojo/framework/core/WidgetBase';
import { theme, ThemedMixin } from '@dojo/framework/core/mixins/Themed';
import { tsx } from '@dojo/framework/core/vdom';
import watch from '@dojo/framework/core/decorators/watch';
import Dimensions from '@dojo/framework/core/meta/Dimensions';

import PopupMenu, { PopupMenuPositioning, PopupMenuItem } from '../popup-menu/PopupMenu';

import * as css from './PopupMenuButton.m.css';

export type PopupMenuPosition =
	| 'top-left'
	| 'top-right'
	| 'left-top'
	| 'left-bottom'
	| 'right-top'
	| 'right-bottom'
	| 'bottom-left'
	| 'bottom-right';

export interface PopupMenuButtonProperties {
	items: PopupMenuItem[];
	position?: PopupMenuPosition;
}

@theme(css)
export default class PopupMenuButton extends ThemedMixin(WidgetBase)<PopupMenuButtonProperties> {
	@watch() private open = false;
	@watch() private hasFocus = false;
	@watch() private hadFocus = false;
	private onClick: Function | undefined = () => (this.open = true);

	protected render() {
		const { items, position = 'top-right' } = this.properties;

		this.onClick = this.hadFocus ? undefined : () => (this.open = true);

		const { size } = this.meta(Dimensions).get('buttonWrapper');

		/**
		 * Alignment to button
		 *
		 *       TL      TR
		 *       __________
		 *   LT |          | RT
		 *      |  Popup   |
		 *      |  Menu    |
		 *   LB |__________| RB
		 *       BL      BR
		 */

		const positioning: PopupMenuPositioning = {};
		switch (position) {
			case 'top-left': // TL
				positioning.left = 0;
				positioning.top = size.height;
				break;
			case 'top-right': // TR
				positioning.right = 0;
				positioning.top = size.height;
				break;
			case 'left-top': // LT
				positioning.left = size.width;
				positioning.top = 0;
				break;
			case 'left-bottom': // LB
				positioning.left = size.width;
				positioning.bottom = 0;
				break;
			case 'right-top': // RT
				positioning.right = size.width;
				positioning.top = 0;
				break;
			case 'right-bottom': // RB
				positioning.right = size.width;
				positioning.bottom = 0;
				break;
			case 'bottom-left': // BL
				positioning.left = 0;
				positioning.bottom = size.height;
				break;
			case 'bottom-right': // BR
				positioning.right = 0;
				positioning.bottom = size.height;
				break;
		}

		if (!this.hasFocus && this.hadFocus) {
			setTimeout(() => (this.hadFocus = false), 250); // Delay by 250ms to allow onclick event on the button to resolve first
		}

		return (
			<div classes={this.theme(css.root)}>
				<div key="buttonWrapper">
					<button
						key="popupMenuButton"
						classes={this.theme(css.button)}
						onclick={() => {
							this.onClick && this.onClick();
						}}
					>
						{this.children}
					</button>
				</div>
				{this.open && (
					<PopupMenu
						key="popupMenu"
						position={positioning}
						onFocus={() => {
							this.hasFocus = true;
							this.hadFocus = true;
						}}
						onBlur={() => {
							this.open = false;
							this.hasFocus = false;
						}}
						items={items.map((item) => ({
							...item,
							onClick: () => {
								item.onClick && item.onClick();
								this.open = false;
								this.hasFocus = false;
								this.hadFocus = false;
							}
						}))}
					/>
				)}
			</div>
		);
	}
}
