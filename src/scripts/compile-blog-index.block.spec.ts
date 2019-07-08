import * as fs from 'fs-extra';
import { advanceTo, clear } from 'jest-date-mock';

import {
	file1,
	file2,
	file3,
	file4,
	fileList,
	blogPost1Excerpt,
	blogPost2Excerpt,
	blogPost3,
	blogPost4
} from '../test/blog-posts.mock';

import * as compiler from './compile';
import compileBlogIndexBlock from './compile-blog-index.block';

describe('compile block index block', () => {
	const mockReaddir = jest.spyOn(fs, 'readdir');
	const mockGetLocalFile = jest.spyOn(compiler, 'getLocalFile');
	const mockGetCompiledKey = jest.spyOn(compiler, 'getCompiledKey');

	beforeEach(() => {
		jest.resetAllMocks();

		mockGetCompiledKey.mockReturnValue('compiledKey');
		mockReaddir.mockReturnValue(Promise.resolve(fileList));
		mockGetLocalFile
			.mockReturnValueOnce(Promise.resolve(file1))
			.mockReturnValueOnce(Promise.resolve(file2))
			.mockReturnValueOnce(Promise.resolve(file3))
			.mockReturnValueOnce(Promise.resolve(file4));

		advanceTo(new Date(2019, 5, 13, 0, 0, 0)); // reset to date time.
	});

	afterEach(() => {
		clear();
	});

	it('returns a list of BlogPosts for files in the the blog folder', async () => {
		const result = await compileBlogIndexBlock({ locale: 'en' });

		expect(result).toEqual([blogPost4, blogPost2Excerpt, blogPost1Excerpt, blogPost3]);
	});

	it('defaults to english when a locale is not provided', async () => {
		const result = await compileBlogIndexBlock({});

		expect(result).toEqual([blogPost4, blogPost2Excerpt, blogPost1Excerpt, blogPost3]);
	});

	it('looks in the appropriate folder based on locale', async () => {
		const result = await compileBlogIndexBlock({ locale: 'fr' });

		expect(result).toEqual(
			[blogPost4, blogPost2Excerpt, blogPost1Excerpt, blogPost3].map((file) => ({
				...file,
				file: file.file.replace('en', 'fr')
			}))
		);
	});
});
