import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';
import { Registry } from '@dojo/framework/widget-core/Registry';
import { Router } from '@dojo/framework/routing/Router';
import { MemoryHistory } from '@dojo/framework/routing/history/MemoryHistory';

import * as sectionListBuild from '../../scripts/section-list.build';
import Section from './Section';
import * as css from './Section.m.css';
import SectionList from './SectionList';
import Page from '../Page';

jest.mock('../../scripts/section-list.build');
jest.mock('@dojo/framework/routing/Router');

describe('Section', () => {
	const pages = [
		{
			name: 'one',
			path: 'path/to/one'
		},
		{
			name: 'two',
			path: 'path/to/two'
		}
	];
	const mockSectionListBuild = jest.spyOn(sectionListBuild, 'default');
	const section = 'tutorials';

	const registry = new Registry();
	const router = new Router(
		[
			{
				path: 'path/to/one',
				outlet: 'one'
			},
			{
				path: 'path/to/two',
				outlet: 'two'
			}
		],
		{ HistoryManager: MemoryHistory }
	);

	registry.defineInjector('router', () => () => router);

	class TestSection extends Section {
		constructor() {
			super();

			this.registry.base = registry;
		}
	}

	it('renders default with path', () => {
		const path = 'path/to/two';
		mockSectionListBuild.mockReturnValueOnce(pages);

		const h = harness(() => <TestSection section={section} path={`${path}`} />);
		expect(mockSectionListBuild).toBeCalledWith(section);
		h.expect(() => (
			<div classes={css.root}>
				<SectionList key={`list-${section}`} section={section} pages={pages} currentPath={path} />
				<Page key={`page-${section}-${path.replace('/', '-')}`} path={path} hasSection={true} />
			</div>
		));
	});

	it('redirects with pages but without path', () => {
		const path = 'path/to/one';
		mockSectionListBuild.mockReturnValueOnce(pages);
		const mockSetPath = jest.spyOn(router, 'setPath');

		harness(() => <TestSection section={section} />);
		expect(mockSectionListBuild).toBeCalledWith(section);
		expect(mockSetPath).toBeCalledWith(path);
	});

	it('renders empty section list if no pages', () => {
		mockSectionListBuild.mockReturnValueOnce([]);

		const h = harness(() => <TestSection section={section} />);
		expect(mockSectionListBuild).toBeCalledWith(section);
		h.expect(() => (
			<div classes={css.root}>
				<SectionList key={`list-${section}`} section={section} pages={[]} currentPath={undefined} />
			</div>
		));
	});
});
