import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';
import assertionTemplate from '@dojo/framework/testing/assertionTemplate';

import Page from './Page';
import * as css from './Page.m.css';

describe('Page', () => {
	const baseAssertionTemplate = assertionTemplate(() => (
		<div {...{ '~key': 'root' }} classes={[css.root]}>
			<div classes={css.content}>Some Content</div>
		</div>
	));

	it('renders', () => {
		const h = harness(() => <Page>Some Content</Page>);

		h.expect(baseAssertionTemplate);
	});
});
