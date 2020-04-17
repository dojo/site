import harness from '@dojo/framework/testing/harness/harness';
import { tsx } from '@dojo/framework/core/vdom';

import Alert from '../Alert';
import * as css from '../Alert.m.css';

describe('Alert', () => {
	const children = 'Some text here';

	it('renders without type', () => {
		const h = harness(() => <Alert>{children}</Alert>);
		h.expect(() => <div classes={[css.root, css.info]}>{children}</div>);
	});

	it('renders with success type', () => {
		const h = harness(() => <Alert type="success">{children}</Alert>);
		h.expect(() => <div classes={[css.root, css.success]}>{children}</div>);
	});

	it('renders with warning type', () => {
		const h2 = harness(() => <Alert type="warning">{children}</Alert>);
		h2.expect(() => <div classes={[css.root, css.warning]}>{children}</div>);
	});

	it('renders with danger type', () => {
		const h3 = harness(() => <Alert type="danger">{children}</Alert>);
		h3.expect(() => <div classes={[css.root, css.danger]}>{children}</div>);
	});

	it('renders with info type', () => {
		const h4 = harness(() => <Alert type="info">{children}</Alert>);
		h4.expect(() => <div classes={[css.root, css.info]}>{children}</div>);
	});
});
