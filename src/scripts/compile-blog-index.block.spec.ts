import * as fs from 'fs-extra';

import compileBlogIndexBlock from './compile-blog-index.block';

const files = ['file1.md', 'file2.md', 'file3.md'];

const expectedOutput = ['blog/en/file1.md', 'blog/en/file2.md', 'blog/en/file3.md'];

describe('compile block index block', () => {
	const mockReaddir = jest.spyOn(fs, 'readdir');

	beforeEach(() => {
		jest.resetAllMocks();

		mockReaddir.mockReturnValue(Promise.resolve(files));
	});

	it('returns a list of file paths for files in the the blog folder', async () => {
		const result = await compileBlogIndexBlock({ locale: 'en' });

		expect(result).toEqual(expectedOutput);
	});

	it('defaults to english when a locale is not provided', async () => {
		const result = await compileBlogIndexBlock({});

		expect(result).toEqual(expectedOutput);
	});

	it('looks in the appropriate folder based on locale', async () => {
		const result = await compileBlogIndexBlock({ locale: 'fr' });

		expect(result).toEqual(expectedOutput.map((file) => file.replace('en', 'fr')));
	});
});
