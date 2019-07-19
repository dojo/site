import * as fs from 'fs-extra';

import * as compiler from './compile';
import compileBlogIndexBlock from './compile-blog-index.block';

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
	const mockGetLocalFile = jest.spyOn(compiler, 'getLocalFile');

	beforeEach(() => {
		jest.resetAllMocks();

		mockReaddir.mockReturnValue(Promise.resolve(files));
		mockGetLocalFile
			.mockReturnValueOnce(Promise.resolve(file1))
			.mockReturnValueOnce(Promise.resolve(file2))
			.mockReturnValueOnce(Promise.resolve(file3))
			.mockReturnValueOnce(Promise.resolve(file4));
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
