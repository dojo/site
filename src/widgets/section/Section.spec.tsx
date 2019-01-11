import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';

import Section from './Section';
import SectionList from './SectionList';
import Page from '../Page';
import * as css from './Section.m.css';
import * as sectionList from '../../scripts/section-list.build';

jest.mock('../../scripts/section-list.build');

describe('Section', () => {
	it('renders default', () => {
		const section = 'tutorials';
		const path = 'tutorials/page-1';

		const h = harness(() => <Section section={section} path={`${path}`} />);
		h.expect(() => <div />);
	});
});
