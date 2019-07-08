import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';
import { add } from '@dojo/framework/core/has';
import { Intersection } from '@dojo/framework/core/meta/Intersection';

import { MockMetaMixin } from '../../test/util/MockMeta';

import CodeSandbox from './CodeSandbox';
import * as css from './CodeSandbox.m.css';
import assertionTemplate from '@dojo/framework/testing/assertionTemplate';

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
		jest.useFakeTimers();
		add('build-time-render', false, true);
		const url = 'https://codesandbox.io/embed/dummy';

		let mockMetaMixin = new MockMetaMixin(CodeSandbox);
		mockMetaMixin.registerMetaCallOnce(
			Intersection,
			'get',
			['root'],
			{
				isIntersecting: false
			},
			{
				value: { isIntersecting: true },
				shouldInvalidate: true
			}
		);
		const CodeSandboxMock = mockMetaMixin.getClass();

		const h = harness(() => <CodeSandboxMock url={url} />);
		h.expect(baseAssertion);

		jest.runAllTimers();

		h.expect(baseAssertion.setProperty('~iframe', 'src', `${url}?autoresize=1&hidenavigation=1`));
	});

	it('does not render during build-time-rendering', () => {
		add('build-time-render', true, true);
		const url = 'https://codesandbox.io/embed/dummy';

		const h = harness(() => <CodeSandbox url={url} />);
		h.expect(() => undefined);
	});
});
