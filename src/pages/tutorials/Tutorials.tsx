import WidgetBase from '@dojo/framework/core/WidgetBase';
import { tsx } from '@dojo/framework/core/vdom';
import Outlet from '@dojo/framework/routing/Outlet';

import Tutorial from '../Tutorial';

export default class Tutorials extends WidgetBase {
	protected render() {
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
	}
}
