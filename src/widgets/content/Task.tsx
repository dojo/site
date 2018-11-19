import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';

import * as css from './Task.m.css';

export default class Task extends WidgetBase {
	render() {
		return <div classes={[css.root]}>{this.children}</div>;
	}
}
