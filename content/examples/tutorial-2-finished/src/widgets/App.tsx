import { tsx, v, create } from '@dojo/framework/core/vdom';

const factory = create();

export default factory(function App() {
	// @start-region render
	return v('div', [
		'Here is some content!',
		<div>Something else again </div>,
		// @start-region a-onclick
		<a onclick={(event) => console.log(event)}>Click me!</a>
		// @end-region a-onclick
	]);
	// @end-region render
});
