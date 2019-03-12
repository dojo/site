import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';

import Image from './Image';

describe('Image', () => {
	it('renders', () => {
		const h = harness(() => <Image width={500} height={500} alt="alt" path="path" />);
		h.expect(() => <img width={500} height={500} alt="alt" src="/assets/blog/path" />);
	});
});
