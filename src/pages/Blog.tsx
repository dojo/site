import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';

import * as css from './Blog.m.css';

export default class Blog extends WidgetBase {
	protected render() {
		return (
			<div>
				<h1 classes={[css.root]}>Blog</h1>
			</div>
		);
	}
}
