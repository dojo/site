import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';

import * as css from './Community.m.css';

export default class Community extends WidgetBase {
	protected render() {
		return <div><h1 classes={[css.root]}>Community</h1></div>
	}
}
