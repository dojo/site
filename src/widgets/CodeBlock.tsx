import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';

export default class CodeBlock extends WidgetBase {
	render() {
		return (
			<div>{ this.children }</div>
		);
	}
}
