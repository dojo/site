import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import * as css from './Documentation.m.css';

export default class Documentation extends WidgetBase {
	protected render() {
		return <div><h1 classes={[css.root]}>Documentation</h1></div>
	}
}
