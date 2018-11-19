const { describe, it } = intern.getInterface('bdd');
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';

import Task from '../../../../src/widgets/content/Task';
import * as css from '../../../../src/widgets/content/Task.m.css';

describe('Task', () => {
	it('renders', () => {
		const children = 'Some text here';

		const h = harness(() => <Task>{children}</Task>);
		h.expect(() => <div classes={[css.root]}>{children}</div>);
	});
});
