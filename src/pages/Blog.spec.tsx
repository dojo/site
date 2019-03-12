import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Landing from '../widgets/landing/Landing';

import Blog from './Blog';

describe('Blog', () => {
	it('renders', () => {
		const h = harness(() => <Blog />);
		h.expect(() => <Landing />);
	});
});
