import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';

import * as css from './Home.m.css';

export default class Home extends WidgetBase {
	protected render() {
		return (
			<div>
				<h1 classes={[css.root]}>Home</h1>
			</div>
		);
	}
}
