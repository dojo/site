import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';
import assertionTemplate from '@dojo/framework/testing/assertionTemplate';

import Page from './Page';
import * as css from './Page.m.css';

describe('Page', () => {
	const baseAssertionTemplate = assertionTemplate(() => (
		<div {...{ '~key': 'root' }} classes={[css.root, undefined]}>
			<div classes={css.content}>Some Content</div>
			<footer classes={css.footer}>
				<span>{`© ${new Date().getFullYear()} JS Foundation, All Rights Reserved.`}</span>
			</footer>
		</div>
	));

	it('renders without left menu', () => {
		const h = harness(() => <Page>Some Content</Page>);

		h.expect(baseAssertionTemplate);
	});

	it('renders with left menu', () => {
		const h = harness(() => <Page hasLeftSideMenu>Some Content</Page>);

		const assertion = baseAssertionTemplate.setProperty('~root', 'classes', [css.root, css.contentShiftRight]);

		h.expect(assertion);
	});
});
