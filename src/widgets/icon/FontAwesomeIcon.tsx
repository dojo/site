import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { VNode, SupportedClassName } from '@dojo/framework/widget-core/interfaces';
import { v } from '@dojo/framework/widget-core/d';
import ThemedMixin, { theme, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';

import {
	icon,
	parse,
	IconName,
	IconLookup,
	AbstractElement,
	FaSymbol,
	Transform,
	IconPrefix
} from '@fortawesome/fontawesome-svg-core';

import * as css from './FontAwesomeIcon.m.css';

export function objectWithKey(key: string, value: any) {
	return (Array.isArray(value) && value.length > 0) || (!Array.isArray(value) && value) ? { [key]: value } : {};
}

export type IconSize = 'lg' | 'xs' | 'sm' | '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x';

export function abstractElementToVNode(abstractElement: AbstractElement, rootTheme: SupportedClassName, level = 0) {
	let children: VNode[] = [];
	if (abstractElement.children) {
		children = abstractElement.children.map(
			(child) => (typeof child === 'string' ? child : abstractElementToVNode(child, rootTheme, level + 1))
		);
	}

	let attributes = abstractElement.attributes || {};
	if (attributes.class) {
		attributes.classes = attributes.class.split(' ');
	}
	if (level === 0) {
		if (attributes.classes) {
			attributes.classes.push(rootTheme);
		} else {
			attributes.classes = rootTheme;
		}
	}

	return v(abstractElement.tag, attributes, children);
}

export interface FontAwesomeIconProperties extends ThemedProperties {
	icon: IconName | IconLookup | [IconPrefix, IconName];
	spin?: boolean;
	pulse?: boolean;
	fixedWidth?: boolean;
	inverse?: boolean;
	border?: boolean;
	listItem?: boolean;
	flip?: 'vertical' | 'horizontal' | 'both';
	size?: IconSize;
	rotation?: 90 | 180 | 270;
	pull?: 'right' | 'left';
	mask?: IconName | IconLookup | null;
	symbol?: FaSymbol;
	transform?: string | Transform;
	title?: string;
}

@theme(css)
export default class FontAwesomeIcon extends ThemedMixin(WidgetBase)<FontAwesomeIconProperties> {
	normalizeIconArgs(icon: IconName | IconLookup | [IconPrefix, IconName]): IconLookup {
		if (typeof icon === 'string') {
			return { prefix: 'fas', iconName: icon };
		}

		if (Array.isArray(icon) && icon.length === 2) {
			return { prefix: icon[0], iconName: icon[1] };
		}

		return icon as IconLookup;
	}

	protected render() {
		const {
			border = false,
			mask: maskArgs = null,
			fixedWidth = false,
			inverse = false,
			flip = null,
			icon: iconArgs,
			listItem = false,
			pull = null,
			pulse = false,
			rotation = null,
			size = null,
			spin = false,
			symbol = false,
			title = '',
			transform: transformArgs = null
		} = this.properties;

		const classesLookup: { [key: string]: boolean } = {
			'fa-spin': spin,
			'fa-pulse': pulse,
			'fa-fw': fixedWidth,
			'fa-inverse': inverse,
			'fa-border': border,
			'fa-li': listItem,
			'fa-flip-horizontal': flip === 'horizontal' || flip === 'both',
			'fa-flip-vertical': flip === 'vertical' || flip === 'both',
			[`fa-${size}`]: size !== null,
			[`fa-rotate-${rotation}`]: rotation !== null,
			[`fa-pull-${pull}`]: pull !== null
		};

		const classes: string[] = Object.keys(classesLookup).filter((key: string) => classesLookup[key]);

		const iconLookup = this.normalizeIconArgs(iconArgs);
		const transform = objectWithKey(
			'transform',
			typeof transformArgs === 'string' ? parse.transform(transformArgs) : transformArgs
		);
		let mask = null;
		if (maskArgs !== null) {
			mask = this.normalizeIconArgs(maskArgs);
		}
		let maskLookup = objectWithKey('mask', mask);

		const renderedIcon = icon(iconLookup, {
			classes,
			...transform,
			...maskLookup,
			symbol,
			title
		});

		if (!renderedIcon) {
			return null;
		}

		const { abstract: abstractElements } = renderedIcon;
		return abstractElements.map((abstractElement) => abstractElementToVNode(abstractElement, this.theme(css.root)));
	}
}
