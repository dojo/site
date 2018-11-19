import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';

import * as css from './Instruction.m.css';

export default class Instruction extends WidgetBase {
	render() {
		return <div classes={[css.root]}>{this.children}</div>;
	}
}
