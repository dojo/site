import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';
import { Registry } from '@dojo/framework/widget-core/Registry';
import { Router } from '@dojo/framework/routing/Router';
import { MemoryHistory } from '@dojo/framework/routing/history/MemoryHistory';

import * as sectionListBlock from '../../scripts/section-list.block';
import Section from './Section';
import * as css from './Section.m.css';
import SectionList from './SectionList';
import Page from '../Page';

jest.mock('../../scripts/section-list.block');
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
	const mockSectionListBlock = jest.spyOn(sectionListBlock, 'default');
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
		mockSectionListBlock.mockReturnValue(pages);

		expect(mockSectionListBlock).not.toHaveBeenCalled();
		const h = harness(() => <TestSection section={section} path={`${path}`} />);
		const widget = (h.getRender(0) as any).bind;
		widget.onAttach();

		expect(mockSectionListBlock).toBeCalledWith(section);
		expect(mockSectionListBlock).toHaveBeenCalledTimes(1);

		h.expect(() => (
			<div classes={css.root}>
				<SectionList key={`list-${section}`} section={section} pages={pages} currentPath={path} />
				<Page key={`page-${section}-${path.replace('/', '-')}`} path={path} hasSection={true} />
			</div>
		));
	});

	it('renders empty section list if no pages', () => {
		mockSectionListBlock.mockReturnValueOnce([]);

		const h = harness(() => <TestSection section={section} />);
		const widget = (h.getRender(0) as any).bind;
		widget.onAttach();

		expect(mockSectionListBlock).toBeCalledWith(section);
		h.expect(() => (
			<div classes={css.root}>
				<SectionList key={`list-${section}`} section={section} pages={[]} currentPath={undefined} />
			</div>
		));
	});
});
