import * as fs from 'fs-extra';

import indexBlock from '../index.block';

const files = ['file1.md', 'file2.md', 'file3.md', 'file4.md'];

const file1 = `
---
title: Blog Title 1
date: 2018-10-15 12:00:00
author: Paul Shannon
---
## Blog Title 1
`;

const file2 = `
---
title: Blog Title 2
date: 2017-06-30 18:00:00
author: Paul Shannon
---
## Blog Title 2
`;

const file3 = `
---
title: Blog Title 3
date: 2017-01-05 08:00:00
author: Paul Shannon
---
## Blog Title 3
`;
const file4 = `\
## A blog with no meta data
`;

const expectedOutput = ['blog/en/file1.md', 'blog/en/file2.md', 'blog/en/file3.md', 'blog/en/file4.md'];

describe('compile block index block', () => {
	const mockReaddir = jest.spyOn(fs, 'readdir');
	const mockReadFile: jest.SpyInstance<Promise<string>> = jest.spyOn(fs, 'readFile') as any;

	beforeEach(() => {
		jest.resetAllMocks();

		mockReaddir.mockReturnValue(Promise.resolve(files));
		mockReadFile
			.mockResolvedValue(file1)
			.mockResolvedValue(file2)
			.mockResolvedValue(file3)
			.mockResolvedValue(file4);
	});

	it('returns a list of file paths for files in the the blog folder', async () => {
		const result = await indexBlock({ locale: 'en' });

		expect(result).toEqual(expectedOutput);
	});

	it('defaults to english when a locale is not provided', async () => {
		const result = await indexBlock({});

		expect(result).toEqual(expectedOutput);
	});

	it('looks in the appropriate folder based on locale', async () => {
		const result = await indexBlock({ locale: 'fr' });

		expect(result).toEqual(expectedOutput.map((file) => file.replace('en', 'fr')));
	});
});
