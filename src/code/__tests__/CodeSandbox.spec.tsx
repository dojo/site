import { add } from '@dojo/framework/core/has';
add('test', true, true);

import assertionTemplate from '@dojo/framework/testing/assertionTemplate';
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';
import intersection from '@dojo/framework/core/middleware/intersection';

import * as css from '../CodeSandbox.m.css';
import CodeSandbox from '../CodeSandbox';
import createIntersectionMock from '@dojo/framework/testing/mocks/middleware/intersection';

const noop: any = () => {};

export const stubEvent = {
	stopPropagation: noop,
	preventDefault: noop,
	target: {}
};

describe('CodeSandbox', () => {
	const baseAssertion = assertionTemplate(() => (
		<div key="root" classes={[css.root]}>
			<iframe assertion-key="iframe" classes={[css.root]} src="" />
		</div>
	));

	it('renders', () => {
		add('build-time-render', false, true);
		const url = 'https://codesandbox.io/embed/dummy';

		const intersectionMock = createIntersectionMock();

		const h = harness(() => <CodeSandbox url={url} />, { middleware: [[intersection, intersectionMock]] });
		h.expect(baseAssertion);

		intersectionMock('root', { isIntersecting: true });

		h.expect(baseAssertion.setProperty('~iframe', 'src', `${url}?autoresize=1&hidenavigation=1`));
	});

	it('does not render during build-time-rendering', () => {
		add('build-time-render', true, true);
		const url = 'https://codesandbox.io/embed/dummy';

		const h = harness(() => <CodeSandbox url={url} />);
		h.expect(() => undefined);
	});
});
