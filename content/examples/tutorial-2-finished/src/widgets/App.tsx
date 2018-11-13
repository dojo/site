import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import { v } from '@dojo/framework/widget-core/d';

export default class App extends WidgetBase {
	// @start-region onclick
	private _onclick(event: any) {
		console.log(event);
	}
	// @end-region onclick

	// @start-region render
	protected render() {
		return v('div', [
			'Here is some content!',
			<div>Something else again </div>,
			// @start-region a-onclick
			v('a', { onclick: this._onclick }, [ 'Click me!' ])
			// @end-region a-onclick
		]);
	}
	// @end-region render
}
