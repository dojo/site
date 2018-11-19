const { describe, it } = intern.getInterface('bdd');
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';

import CodeBlock from '../../../../src/widgets/code/CodeBlock';

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
