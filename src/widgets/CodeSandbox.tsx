import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Intersection from '@dojo/framework/widget-core/meta/Intersection';
import has from '@dojo/framework/has/has';

const CodeSandboxStyles = {
	'border': 'none',
	'width': '100%',
	'minHeight': '600px'
};

interface CodeSandboxProperties {
	url: string;
}

export default class CodeSandbox extends WidgetBase<CodeSandboxProperties> {
	private _src = "";

	render() {
		const { url } = this.properties;
		if (!has('build-time-render')) {
			const { isIntersecting } = this.meta(Intersection).get('root');
			if (isIntersecting) {
				this._src = `${url}?autoresize=1&hidenavigation=1`;
			}
		} else {
			this._src = `${url}?autoresize=1&hidenavigation=1`;
		}
		return (
			<div key='root' styles={ CodeSandboxStyles }>
				<iframe styles={ CodeSandboxStyles } src={ this._src }></iframe>
			</div>
		);
	}
}
