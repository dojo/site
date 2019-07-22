import { tsx, create } from '@dojo/framework/core/vdom';
import Outlet from '@dojo/framework/routing/Outlet';

import Tutorial from './Tutorial';

const factory = create();

export default factory(function Tutorials() {
	return [
		<Outlet
			key="tutorial-local-installation"
			id="tutorial-local-installation"
			renderer={() => <Tutorial path="tutorials/local-installation.md" />}
		/>,
		<Outlet
			key="tutorial-sample-tutorial"
			id="tutorial-sample-tutorial"
			renderer={() => <Tutorial path="tutorials/sample-tutorial.md" />}
		/>,
		<Outlet
			key="tutorial-another-tutorial"
			id="tutorial-another-tutorial"
			renderer={() => <Tutorial path="tutorials/another-tutorial.md" />}
		/>
	];
});
