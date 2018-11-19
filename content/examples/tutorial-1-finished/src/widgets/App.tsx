import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { v } from '@dojo/framework/widget-core/d';

export default class App extends WidgetBase {
	// @start-region render
	protected render() {
		return v('div', [
			'Here is some content!',
			v('div', [ 'Something else again '])
		]);
	}
	// @end-region render
}
