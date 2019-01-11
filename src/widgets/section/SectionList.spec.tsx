import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';

import SectionList from './SectionList';
import * as css from '../Page.m.css';
import * as sectionList from '../../scripts/compile.build';

jest.mock('../scripts/section-list.build');

describe('Section List', () => {
	it('renders', () => {
		const section = 'tutorials';

		const h = harness(() => <Page path={`${path}`} />);
		h.expect(() => <div classes={css.root}>Some content</div>);
	});
});
