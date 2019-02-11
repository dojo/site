import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Link from '@dojo/framework/routing/Link';

import { subsections } from '../../scripts/section-list.block.spec';
import SectionList from './SectionList';
import * as css from './SectionList.m.css';

describe('Section List', () => {
	const section = 'tutorials';

	function expected(selected?: 'one' | 'two' | 'three') {
		return (
			<div key="section-list-tutorials" classes={css.root}>
				<div key="subsection-list-Sub-Section 1" classes={css.subsection}>
					<h5 classes={css.subsectionHeader}>Sub-Section 1</h5>
					<ul classes={css.list}>
						<li key="section-list-tutorials-path/to/one">
							<Link
								to="tutorials-page"
								params={{ page: 'path/to/one' }}
								classes={selected === 'one' ? [css.itemLink, css.selected] : [css.itemLink]}
							>
								one
							</Link>
						</li>
						<li key="section-list-tutorials-path/to/two">
							<Link
								to="tutorials-page"
								params={{ page: 'path/to/two' }}
								classes={selected === 'two' ? [css.itemLink, css.selected] : [css.itemLink]}
							>
								two
							</Link>
						</li>
					</ul>
				</div>
				<div key="subsection-list-Sub-Section 2" classes={css.subsection}>
					<h5 classes={css.subsectionHeader}>Sub-Section 2</h5>
					<ul classes={css.list}>
						<li key="section-list-tutorials-path/to/three">
							<Link
								to="tutorials-page"
								params={{ page: 'path/to/three' }}
								classes={selected === 'three' ? [css.itemLink, css.selected] : [css.itemLink]}
							>
								three
							</Link>
						</li>
					</ul>
				</div>
			</div>
		);
	}

	it('renders default', () => {
		const h = harness(() => <SectionList subsections={subsections} section={section} />);
		h.expect(() => expected());
	});

	it('renders selected link', () => {
		let selectedPath = 'path/to/two';
		const h = harness(() => <SectionList subsections={subsections} section={section} currentPath={selectedPath} />);
		h.expect(() => expected('two'));

		selectedPath = 'path/to/three';
		h.expect(() => expected('three'));
	});
});
