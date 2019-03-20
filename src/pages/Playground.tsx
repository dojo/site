import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';

import * as css from './Playground.m.css';
import has from '@dojo/framework/has/has';

export default class Playground extends WidgetBase {
	protected render() {
		if (!has('build-time-render')) {
			const src =
				'https://codesandbox.io/embed/github/dojo/dojo-codesandbox-template/tree/master/?autoresize=1&hidenavigation=1';
			return <iframe classes={[css.iframe]} src={src} />;
		}
	}
}
