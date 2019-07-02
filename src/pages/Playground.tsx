import WidgetBase from '@dojo/framework/core/WidgetBase';
import { tsx } from '@dojo/framework/core/vdom';

import * as css from './Playground.m.css';
import has from '@dojo/framework/core/has';

export default class Playground extends WidgetBase {
	protected render() {
		if (!has('build-time-render')) {
			const src =
				'https://codesandbox.io/embed/github/dojo/dojo-codesandbox-template/tree/master/?autoresize=1&hidenavigation=1';
			return <iframe classes={[css.iframe]} src={src} />;
		}
	}
}
