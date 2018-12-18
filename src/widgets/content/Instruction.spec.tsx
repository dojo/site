import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';

import Instruction from './Instruction';
import * as css from './Instruction.m.css';

describe('Instruction', () => {
	it('renders', () => {
		const children = 'Some text here';

		const h = harness(() => <Instruction>{children}</Instruction>);
		h.expect(() => <div classes={[css.root]}>{children}</div>);
	});
});
