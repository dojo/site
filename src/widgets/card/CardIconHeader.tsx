import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import { tsx } from '@dojo/framework/widget-core/tsx';

import { IconName, IconLookup, IconPrefix } from '@fortawesome/fontawesome-svg-core';

import FontAwesomeIcon from '../icon/FontAwesomeIcon';

import * as css from './CardIconHeader.m.css';

export type IconHeaderBackgroundColor = 'blue' | 'black' | 'green' | 'purple' | 'orange';

export interface CardIconHeaderProperties {
	icon: IconName | IconLookup | [IconPrefix, IconName];
	background?: IconHeaderBackgroundColor;
}

export const colorClasses: { [key in IconHeaderBackgroundColor]: string } = {
	blue: css.backgroundBlue,
	black: css.backgroundBlack,
	green: css.backgroundGreen,
	purple: css.backgroundPurple,
	orange: css.backgroundOrange
};

@theme(css)
export default class CardIconHeader extends ThemedMixin(WidgetBase)<CardIconHeaderProperties> {
	protected render() {
		const { icon, background = 'blue' } = this.properties;

		return (
			<header
				key="card-icon-header"
				data-test="card-icon-header"
				classes={this.theme([css.root, colorClasses[background]])}
			>
				<FontAwesomeIcon icon={icon} size="4x" />
			</header>
		);
	}
}
