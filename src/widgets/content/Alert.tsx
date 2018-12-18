import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';

import * as css from './Alert.m.css';

export interface AlertProperties {
	type?: 'success' | 'info' | 'danger' | 'warning';
}

export default class Alert extends WidgetBase<AlertProperties> {
	render() {
		const { type = 'info' } = this.properties;

		return <div classes={[css.root, css[type]]}>{this.children}</div>;
	}
}
