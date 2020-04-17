import harness from '@dojo/framework/testing/harness/harness';
import { tsx } from '@dojo/framework/core/vdom';

import CodeBlock from '../CodeBlock';

describe('CodeBlock', () => {
	it('renders', () => {
		const children = (
			<pre class="language-ts">
				<pre class="code-ts">Something</pre>
			</pre>
		);

		const h = harness(() => <CodeBlock>{children}</CodeBlock>);
		h.expect(() => <div>{children}</div>);
	});
});
