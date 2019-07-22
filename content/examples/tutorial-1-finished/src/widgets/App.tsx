import { tsx, create } from '@dojo/framework/core/vdom';

const factory = create();

export default factory(function App() {
	// @start-region render
	return (
		<div>
			Here is some content!
			<div>Something else again</div>
		</div>
	);
	// @end-region render
});
