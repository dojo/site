import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';
import { Constructor, WidgetMetaConstructor, MetaBase } from '@dojo/framework/widget-core/interfaces';
import Block from '@dojo/framework/widget-core/meta/Block';
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { w } from '@dojo/framework/widget-core/d';

import * as sectionListBlock from '../../scripts/section-list.block';
import Section from './Section';
import * as css from './Section.m.css';
import SectionList from './SectionList';
import Page from '../Page';

const mockMetaMixin = <T extends Constructor<WidgetBase<any>>>(Base: T, mockStub: jest.Mock): T => {
	return class extends Base {
		protected meta<T extends MetaBase>(MetaType: WidgetMetaConstructor<T>): T {
			return mockStub(MetaType);
		}
	};
};

describe('Section', () => {
	const section = 'tutorials';

	const subsections: sectionListBlock.Subsection[] = [
		{
			name: 'Sub-Section 1',
			pages: [
				{
					name: 'one',
					url: 'path/to/one',
					path: 'tutorials/path/to/one',
					icon: 'cloud-download-alt',
					topic: 'topic-one',
					description: 'A first tutorial'
				},
				{
					name: 'two',
					url: 'path/to/two',
					path: 'tutorials/path/to/two',
					icon: 'graduation-cap',
					topic: 'topic-two',
					description: 'A second tutorial'
				}
			]
		},
		{
			name: 'Sub-Section 2',
			pages: [
				{
					name: 'three',
					url: 'path/to/three',
					path: 'tutorials/path/to/three',
					icon: 'cloud-download-alt',
					topic: 'topic-three',
					description: 'A third tutorial'
				}
			]
		}
	];

	const mockSectionListBlock = jest.fn();

	const mockBlockRun = jest.fn().mockImplementation((input: any) => {
		return mockSectionListBlock;
	});

	const mockMeta = jest.fn().mockImplementation((input: any) => {
		if (Block) {
			return {
				run: mockBlockRun
			};
		}
	});

	it('renders default with path', () => {
		const path = 'path/to/two';
		mockSectionListBlock.mockReturnValue(subsections);

		expect(mockSectionListBlock).not.toHaveBeenCalled();

		const h = harness(() => w(mockMetaMixin(Section, mockMeta), { section, path }));

		const widget = (h.getRender(0) as any).bind;
		widget.onAttach();

		expect(mockSectionListBlock).toBeCalledWith(section);
		expect(mockSectionListBlock).toHaveBeenCalledTimes(1);

		h.expect(() => (
			<div classes={css.root}>
				<SectionList key={`list-${section}`} section={section} subsections={subsections} />
				<Page key={`page-${section}-${path.replace('/', '-')}`} path={path} hasSection={true} />
			</div>
		));
	});

	it('renders empty section list if no pages', () => {
		mockSectionListBlock.mockReturnValueOnce([]);

		const h = harness(() => w(mockMetaMixin(Section, mockMeta), { section }));

		const widget = (h.getRender(0) as any).bind;
		widget.onAttach();

		expect(mockSectionListBlock).toBeCalledWith(section);
		h.expect(() => (
			<div classes={css.root}>
				<SectionList key={`list-${section}`} section={section} subsections={[]} />
			</div>
		));
	});

	it('renders empty section when section list block returns undefined', () => {
		mockSectionListBlock.mockReturnValueOnce(undefined);

		const h = harness(() => w(mockMetaMixin(Section, mockMeta), { section }));

		h.expect(() => (
			<div classes={css.root}>
				<SectionList key={`list-${section}`} section={section} subsections={[]} />
			</div>
		));
	});
});
