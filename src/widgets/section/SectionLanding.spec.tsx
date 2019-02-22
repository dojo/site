import harness from '@dojo/framework/testing/harness';
import { tsx } from '@dojo/framework/widget-core/tsx';
import { Constructor, WidgetMetaConstructor, MetaBase } from '@dojo/framework/widget-core/interfaces';
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { w } from '@dojo/framework/widget-core/d';
import Block from '@dojo/framework/widget-core/meta/Block';

import * as sectionListBlock from '../../scripts/section-list.block';
import Grid from '../grid/Grid';
import LinkedCard from '../card/LinkedCard';

import SectionLanding from './SectionLanding';
import * as css from './SectionLanding.m.css';
import CardIconHeader from '../card/CardIconHeader';

const mockMetaMixin = <T extends Constructor<WidgetBase<any>>>(Base: T, mockStub: jest.Mock): T => {
	return class extends Base {
		protected meta<T extends MetaBase>(MetaType: WidgetMetaConstructor<T>): T {
			return mockStub(MetaType);
		}
	};
};

describe('Section Landing', () => {
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
					topic: 'widgets',
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

	function expected() {
		return (
			<div classes={css.root}>
				<div key="subsection-Sub-Section 1" classes={css.subsection}>
					<h2>Sub-Section 1</h2>
					<Grid key="subsection-list-Sub-Section 1">
						<div key="tutorials-page-tutorials/path/to/one" classes={css.pageLink}>
							<LinkedCard
								header={<CardIconHeader icon="cloud-download-alt" background={undefined} />}
								outlet="tutorials-page"
								params={{ page: 'path/to/one' }}
							>
								<h4 classes={css.title}>one</h4>
								A first tutorial
							</LinkedCard>
						</div>
						<div key="tutorials-page-tutorials/path/to/two" classes={css.pageLink}>
							<LinkedCard
								header={<CardIconHeader icon="graduation-cap" background={undefined} />}
								outlet="tutorials-page"
								params={{ page: 'path/to/two' }}
							>
								<h4 classes={css.title}>two</h4>
								A second tutorial
							</LinkedCard>
						</div>
					</Grid>
				</div>
				<div key="subsection-Sub-Section 2" classes={css.subsection}>
					<h2>Sub-Section 2</h2>
					<Grid key={`subsection-list-Sub-Section 2`}>
						<div key="tutorials-page-tutorials/path/to/three" classes={css.pageLink}>
							<LinkedCard
								header={<CardIconHeader icon="cloud-download-alt" background="orange" />}
								outlet={`tutorials-page`}
								params={{ page: 'path/to/three' }}
							>
								<h4 classes={css.title}>three</h4>
								A third tutorial
							</LinkedCard>
						</div>
					</Grid>
				</div>
			</div>
		);
	}

	it('renders default', () => {
		mockSectionListBlock.mockReturnValueOnce(subsections);

		const h = harness(() => w(mockMetaMixin(SectionLanding, mockMeta), { section: 'tutorials' }));

		h.expect(() => expected());
	});

	it('renders empty section landing with no subsections', () => {
		mockSectionListBlock.mockReturnValueOnce([]);

		const h = harness(() => w(mockMetaMixin(SectionLanding, mockMeta), { section: 'tutorials' }));

		h.expect(() => <div classes={css.root} />);
	});

	it('renders empty section landing when section list block returns undefined', () => {
		mockSectionListBlock.mockReturnValueOnce(undefined);

		const h = harness(() => w(mockMetaMixin(SectionLanding, mockMeta), { section: 'tutorials' }));

		h.expect(() => <div classes={css.root} />);
	});
});
