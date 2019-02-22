import sectionListBuild, { Subsection } from './section-list.block';
import * as fs from 'fs-extra';
import * as path from 'canonical-path';

jest.mock('fs-extra');
jest.mock('canonical-path');

export const manifestFile: any = {
	tutorials: [
		{
			name: 'Sub-Section 1',
			pages: [
				{
					name: 'one',
					path: 'tutorials/path/to/one.md',
					icon: 'cloud-download-alt',
					topic: 'topic-one',
					description: 'A first tutorial'
				},
				{
					name: 'two',
					path: 'tutorials/path/to/two.md',
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
					path: 'tutorials/path/to/three.md',
					icon: 'cloud-download-alt',
					topic: 'topic-three',
					description: 'A third tutorial'
				}
			]
		}
	],
	someOtherSection: [
		{
			name: 'Other Sub-Section',
			pages: [
				{
					name: 'four',
					path: 'tutorials/path/to/four.md',
					icon: 'cloud-download-alt',
					topic: 'topic-four',
					description: 'A first other page'
				}
			]
		}
	]
};

export const subsections: Subsection[] = [
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

describe('content compiler', () => {
	const mockReadJSONSync = jest.spyOn(fs, 'readJSONSync').mockReturnValue(manifestFile);
	const mockResolve = jest.spyOn(path, 'resolve').mockReturnValue('path/to/somewhere');
	const mockParse = jest.spyOn(path, 'parse').mockReturnValue({
		root: '',
		dir: '',
		base: '',
		ext: '.md',
		name: ''
	});

	afterEach(() => {
		mockParse.mockReset();
		mockParse.mockReturnValue({
			root: '',
			dir: '',
			base: '',
			ext: '.md',
			name: ''
		});
	});

	it('returns data for defined section', async () => {
		const result = await sectionListBuild('tutorials');

		expect(mockResolve).toHaveBeenCalledWith('content', 'manifest.json');
		expect(mockReadJSONSync).toHaveBeenCalledWith('path/to/somewhere');
		expect(mockParse).toHaveBeenCalledTimes(3);
		expect(mockParse).toHaveBeenNthCalledWith(1, 'tutorials/path/to/one.md');
		expect(mockParse).toHaveBeenNthCalledWith(2, 'tutorials/path/to/two.md');
		expect(mockParse).toHaveBeenNthCalledWith(3, 'tutorials/path/to/three.md');

		expect(result).toEqual(subsections);
	});

	it('returns empty list for undefined section', async () => {
		const result = await sectionListBuild('unknown');

		expect(mockResolve).toHaveBeenCalledWith('content', 'manifest.json');
		expect(mockReadJSONSync).toHaveBeenCalledWith('path/to/somewhere');
		expect(mockParse).toHaveBeenCalledTimes(0);

		expect(result).toEqual([]);
	});
});
