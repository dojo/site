import { WidgetBase } from '@dojo/framework/core/WidgetBase';
import ThemedMixin, { theme, ThemedProperties } from '@dojo/framework/core/mixins/Themed';
import { tsx } from '@dojo/framework/core/vdom';
import { LinkProperties } from '@dojo/framework/routing/interfaces';
import Link from '@dojo/framework/routing/Link';

import * as css from './AccessibilityLinkButton.m.css';

export interface AccessibiltyLinkButtonProperties extends ThemedProperties {
	onClick?: () => void;
	disabled?: boolean;
	linkProperties?: LinkProperties;
	href?: string;
}

@theme(css)
export class AccessibilityLinkButton extends ThemedMixin(WidgetBase)<AccessibiltyLinkButtonProperties> {
	protected render() {
		const { key, onClick, disabled = false, linkProperties, href } = this.properties;

		if (href) {
			return (
				<a key={key} href={href} disabled={disabled} classes={this.theme(css.root)}>
					{this.children}
				</a>
			);
		}

		if (linkProperties) {
			return (
				<Link
					key={key ? `${key}` : undefined}
					{...linkProperties}
					disabled={disabled}
					classes={this.theme(css.root)}
				>
					{this.children}
				</Link>
			);
		}

		return (
			<button key={key} type="button" onclick={onClick} disabled={disabled} classes={this.theme(css.root)}>
				{this.children}
			</button>
		);
	}
}

export default AccessibilityLinkButton;
