import assertionTemplate from '@dojo/framework/testing/assertionTemplate';
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/core/vdom';

import * as css from '../CodeSandbox.m.css';
import CodeSandbox from '../CodeSandbox';

const noop: any = () => {};

export const stubEvent = {
	stopPropagation: noop,
	preventDefault: noop,
	target: {}
};

describe('CodeSandbox', () => {
	const baseAssertion = assertionTemplate(() => (
		<div key="root" classes={[css.root]}>
			<iframe
				assertion-key="iframe"
				classes={[css.root]}
				src="https://codesandbox.io/embed/dummy?autoresize=1&hidenavigation=1"
			/>
		</div>
	));

	it('renders', () => {
		const h = harness(() => <CodeSandbox url="https://codesandbox.io/embed/dummy" />);

		h.expect(baseAssertion);
	});
});
