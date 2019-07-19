import { tsx, create } from '@dojo/framework/core/vdom';

const factory = create();

export default factory(function CodeBlock({ children }) {
	return <div>{children()}</div>;
});
