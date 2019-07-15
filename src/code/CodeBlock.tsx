import WidgetBase from '@dojo/framework/core/WidgetBase';
import { tsx } from '@dojo/framework/core/vdom';

export default class CodeBlock extends WidgetBase {
	render() {
		return <div>{this.children}</div>;
	}
}
