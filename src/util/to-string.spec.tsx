import { tsx } from '@dojo/framework/widget-core/tsx';

import { toString } from './to-string';
import { w } from '@dojo/framework/widget-core/d';

describe('to string', () => {
	test('simple text child', () => {
		expect(toString(<div>text</div>)).toBe('text');
	});

	test('complex node', () => {
		expect(toString(
			<div>
				{w('docs-alert', {}, [
					<div>vnode text inside widget</div>
				])}
				<p> followed by a vnode</p>
				<div />
			</div>
		)).toBe('vnode text inside widget followed by a vnode');
	});

	it('returns an empty string if node is undefined', () => {
		expect(toString(undefined)).toBe('');
	});
});
