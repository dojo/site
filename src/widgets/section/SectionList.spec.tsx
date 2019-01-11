import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Link from '@dojo/framework/routing/Link';

import SectionList from './SectionList';
import * as css from './SectionList.m.css';

describe('Section List', () => {
	it('renders', () => {
		const pages: PageData[] = [
			{
				name: 'Local Installation',
				path: 'tutorials/local-installation'
			},
			{
				name: 'Tutorial 2',
				path: 'tutorials/tutorial-2'
			}
		];
		const section = 'tutorials';
		const currentPath = 'tutorials/local-installation';

		const h = harness(() => <SectionList pages={pages} section={section} currentPath={currentPath} />);
		h.expect(() => (
			<div key={`section-list-${section}`} classes={css.root}>
				<ul classes={css.list}>
					{pages.map((s) => {
						const extraClasses: { [key: string]: string } = {};
						if (s.path === currentPath) {
							extraClasses.root = css.selected;
						}

						return (
							<li key={`section-list-${section}-${s.path}`} classes={css.item}>
								<Link to={`${section}-page`} params={{ page: s.path }} extraClasses={extraClasses}>
									{s.name}
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		));
	});
});
