import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';

import Page from './Page';
import * as css from './Page.m.css';
import * as compiler from '../scripts/compile.build';

jest.mock('../scripts/compile.build');

describe('Page', () => {
	it('renders', () => {
		compiler.default = jest.fn().mockReturnValue('Some content');

		const path = 'tutorials/sample-tutorial';

		const h = harness(() => <Page path={`${path}`} />);
		h.expect(() => <div classes={[css.root]}>
			<div classes={css.content}>Some content</div>
		</div>);

		compiler.default.mockRestore();
	});
});
