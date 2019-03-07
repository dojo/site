import { tsx } from '@dojo/framework/widget-core/tsx';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import Outlet from '@dojo/framework/routing/Outlet';
import harness from '@dojo/framework/testing/harness';

import Tutorial from '../Tutorial';

import Tutorials from './Tutorials';

interface Page {
	outlet: string;
	content: DNode;
	args?: any[];
}

describe('Tutorials', () => {
	it('renders', () => {
		const h = harness(() => <Tutorials />);
		h.expect(() => [
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
		]);
	});

	const pages: Page[] = [
		{ outlet: 'tutorial-local-installation', content: <Tutorial path="tutorials/local-installation.md" /> },
		{ outlet: 'tutorial-sample-tutorial', content: <Tutorial path="tutorials/sample-tutorial.md" /> },
		{ outlet: 'tutorial-another-tutorial', content: <Tutorial path="tutorials/another-tutorial.md" /> }
	];

	it('outlets render contents', () => {
		const h = harness(() => <Tutorials />);
		pages.forEach(({ outlet, content, args = [] }) => {
			const renderer = h.trigger(`@${outlet}`, 'renderer', ...args);
			h.expect(() => content, () => renderer);
		});
	});
});
