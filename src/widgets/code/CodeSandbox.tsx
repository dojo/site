import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Intersection from '@dojo/framework/widget-core/meta/Intersection';
import has, { exists } from '@dojo/framework/has/has';

import * as css from './CodeSandbox.m.css';

interface CodeSandboxProperties {
	url: string;
}

export default class CodeSandbox extends WidgetBase<CodeSandboxProperties> {
	private _src = '';

	render() {
		const { url } = this.properties;
		if (exists('build-time-render') && !has('build-time-render')) {
			const { isIntersecting } = this.meta(Intersection).get('root');
			if (isIntersecting) {
				this._src = `${url}?autoresize=1&hidenavigation=1`;
			}

			return (
				<div key="root" classes={[css.root]}>
					<iframe classes={[css.root]} src={this._src} />
				</div>
			);
		}
	}
}
