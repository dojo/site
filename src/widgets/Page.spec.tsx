import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';

import Page from './Page';
import * as css from './Page.m.css';
import * as compiler from '../scripts/compile.build';

jest.mock('../scripts/compile.build');

describe('Page', () => {
	jest.spyOn(compiler, 'default').mockReturnValue('Some content');

	it('renders without section', () => {
		const path = 'tutorials/sample-tutorial';

		const h = harness(() => <Page path={`${path}`} />);
		h.expect(() => (
			<div classes={[css.root]}>
				<div classes={css.content}>Some content</div>
			</div>
		));
	});

	it('renders with section', () => {
		const path = 'tutorials/sample-tutorial';

		const h = harness(() => <Page hasSection={true} path={`${path}`} />);
		h.expect(() => (
			<div classes={[css.root, css.contentShiftRight]}>
				<div classes={css.content}>Some content</div>
			</div>
		));
	});
});
