import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { WidgetProperties } from '@dojo/framework/widget-core/interfaces';
import { tsx } from '@dojo/framework/widget-core/tsx';

import * as css from './Subsection.m.css';

export default class Subsection extends WidgetBase<WidgetProperties> {
	protected render() {
		return <div classes={css.root}>{this.children}</div>;
	}
}
