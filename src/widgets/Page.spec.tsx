import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';

import Page from './Page';
import * as css from './Page.m.css';
import * as compiler from '../scripts/compile.block';

jest.mock('../scripts/compile.block');

describe('Page', () => {
	jest.spyOn(compiler, 'default').mockReturnValue('Some content');

	const footer = (
		<footer classes={css.footer}>
			<span>{`© ${new Date().getFullYear()} JS Foundation, All Rights Reserved.`}</span>
		</footer>
	);

	it('renders without section', () => {
		const path = 'tutorials/sample-tutorial';

		const h = harness(() => <Page path={`${path}`} />);
		h.expect(() => (
			<div classes={[css.root]}>
				<div classes={css.content}>Some content</div>
				{footer}
			</div>
		));
	});

	it('renders with section', () => {
		const path = 'tutorials/sample-tutorial';

		const h = harness(() => <Page hasSection={true} path={`${path}`} />);
		h.expect(() => (
			<div classes={[css.root, css.contentShiftRight]}>
				<div classes={css.content}>Some content</div>
				{footer}
			</div>
		));
	});
});
