import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';

import Image from './Image';
import * as css from './Image.m.css';

describe('Image', () => {
	it('renders', () => {
		const h = harness(() => <Image width={500} height={500} alt="alt" path="path" />);
		h.expect(() => <img classes={css.root} width={500} height={500} alt="alt" src="/assets/blog/path" />);
	});
});
