import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';

import * as css from './Examples.m.css';

export default class Examples extends WidgetBase {
	protected render() {
		return (
			<div>
				<h1 classes={[css.root]}>Examples</h1>
			</div>
		);
	}
}
