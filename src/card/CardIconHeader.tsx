import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';

import { IconName, IconLookup, IconPrefix } from '@fortawesome/fontawesome-svg-core';

import FontAwesomeIcon from '../icon/FontAwesomeIcon';

import * as css from './CardIconHeader.m.css';

export type IconHeaderBackgroundColor = 'blue' | 'black' | 'green' | 'purple' | 'orange';

export interface CardIconHeaderProperties {
	icon: IconName | IconLookup | [IconPrefix, IconName];
	background?: IconHeaderBackgroundColor;
}

const factory = create({ theme }).properties<CardIconHeaderProperties>();

export default factory(function CardIconHeader({ middleware: { theme }, properties }) {
	const { icon, background = 'blue' } = properties();
	const themedCss = theme.classes(css);

	const colorClasses: { [key in IconHeaderBackgroundColor]: string } = {
		blue: themedCss.backgroundBlue,
		black: themedCss.backgroundBlack,
		green: themedCss.backgroundGreen,
		purple: themedCss.backgroundPurple,
		orange: themedCss.backgroundOrange
	};

	return (
		<header
			key="card-icon-header"
			data-test="card-icon-header"
			classes={[themedCss.root, colorClasses[background]]}
		>
			<FontAwesomeIcon icon={icon} size="4x" />
		</header>
	);
});
