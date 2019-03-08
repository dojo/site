import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import { WidgetProperties } from '@dojo/framework/widget-core/interfaces';
import * as css from './Landing.m.css';

export default class Landing extends WidgetBase<WidgetProperties> {
	protected render() {
		return <div classes={css.root}>{this.children}</div>;
	}
}
