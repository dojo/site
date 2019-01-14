import sectionListBuild from './section-list.build';
import * as fs from 'fs-extra';
import * as path from 'canonical-path';

jest.mock('fs-extra');
jest.mock('canonical-path');

describe('content compiler', () => {
	it('should process file', async () => {
		const mockReadJSONSync = jest.spyOn(fs, 'readJSONSync').mockReturnValueOnce({
			sectionName: [
				{
					name: 'one',
					path: 'path/to/one.md'
				},
				{
					name: 'two',
					path: 'path/to/two.md'
				}
			]
		});
		const mockResolve = jest.spyOn(path, 'resolve').mockReturnValueOnce('path/to/somewhere');
		const mockParse = jest.spyOn(path, 'parse').mockReturnValue({ ext: '.md' });

		const result = await sectionListBuild('sectionName');

		expect(mockResolve).toHaveBeenCalledWith('content', 'manifest.json');
		expect(mockReadJSONSync).toHaveBeenCalledWith('path/to/somewhere');
		expect(mockParse).toHaveBeenCalledTimes(2);
		expect(mockParse).toHaveBeenNthCalledWith(1, 'path/to/one.md');
		expect(mockParse).toHaveBeenNthCalledWith(2, 'path/to/two.md');

		expect(result).toEqual([
			{
				name: 'one',
				path: 'path/to/one'
			},
			{
				name: 'two',
				path: 'path/to/two'
			}
		]);
	});
});
