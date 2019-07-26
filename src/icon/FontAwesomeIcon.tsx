import { create, tsx } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';

import { IconName, IconLookup, IconPrefix } from '@fortawesome/fontawesome-common-types';

import * as css from './FontAwesomeIcon.m.css';

export type IconSize = 'lg' | 'xs' | 'sm' | '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x';

export interface FontAwesomeIconProperties {
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
	title?: string;
}

const factory = create({ theme }).properties<FontAwesomeIconProperties>();

export default factory(function FontAwesomeIcon({ middleware: { theme }, properties }) {
	const {
		border = false,
		fixedWidth = false,
		inverse = false,
		flip = null,
		icon,
		listItem = false,
		pull = null,
		pulse = false,
		rotation = null,
		size = null,
		spin = false,
		title
	} = properties();

	const themedCss = theme.classes(css);

	let prefix = '';
	let iconClass = '';
	if (typeof icon === 'string') {
		prefix = 'fas';
		iconClass = `fa-${icon}`;
	} else if (Array.isArray(icon)) {
		prefix = icon[0];
		iconClass = `fa-${icon[1]}`;
	} else {
		prefix = icon.prefix;
		iconClass = `fa-${icon.iconName}`;
	}

	const classesLookup: { [key: string]: boolean } = {
		[`${prefix}`]: true,
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
		[`fa-pull-${pull}`]: pull !== null,
		[`${iconClass}`]: true
	};

	const classes: string[] = Object.keys(classesLookup).filter((key: string) => classesLookup[key]);

	return <i title={title} classes={[themedCss.root, ...classes]} />;
});
