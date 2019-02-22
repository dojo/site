import assertionTemplate from '@dojo/framework/testing/assertionTemplate';
import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';
import ActiveLink from '@dojo/framework/routing/ActiveLink';

import { subsections } from '../../scripts/section-list.block.spec';
import SectionList from './SectionList';
import * as css from './SectionList.m.css';

describe('Section List', () => {
	const section = 'tutorials';

	const baseAssertionTemplate = assertionTemplate(() => (
		<div key="section-list-tutorials" classes={css.root}>
			<div key="subsection-list-Sub-Section 1" classes={css.subsection}>
				<h5 classes={css.subsectionHeader}>Sub-Section 1</h5>
				<ul classes={css.list}>
					<li key="section-list-tutorials-path/to/one">
						<ActiveLink
							to="tutorials-page"
							params={{ page: 'path/to/one' }}
							classes={css.itemLink}
							activeClasses={[css.selected]}
						>
							one
						</ActiveLink>
					</li>
					<li key="section-list-tutorials-path/to/two">
						<ActiveLink
							to="tutorials-page"
							params={{ page: 'path/to/two' }}
							classes={css.itemLink}
							activeClasses={[css.selected]}
						>
							two
						</ActiveLink>
					</li>
				</ul>
			</div>
			<div key="subsection-list-Sub-Section 2" classes={css.subsection}>
				<h5 classes={css.subsectionHeader}>Sub-Section 2</h5>
				<ul classes={css.list}>
					<li key="section-list-tutorials-path/to/three">
						<ActiveLink
							to="tutorials-page"
							params={{ page: 'path/to/three' }}
							classes={css.itemLink}
							activeClasses={[css.selected]}
						>
							three
						</ActiveLink>
					</li>
				</ul>
			</div>
		</div>
	));

	it('renders default', () => {
		const h = harness(() => <SectionList subsections={subsections} section={section} />);
		h.expect(baseAssertionTemplate);
	});
});
