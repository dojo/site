import WidgetBase from '@dojo/framework/core/WidgetBase';
import { tsx } from '@dojo/framework/core/vdom';

import * as css from './Aside.m.css';

interface AsideProperties {
	title: string;
}

export default class Aside extends WidgetBase<AsideProperties> {
	render() {
		const { title } = this.properties;
		return (
			<article classes={[css.root]}>
				<strong>{title}</strong>
				<p>{this.children}</p>
			</article>
		);
	}
}
