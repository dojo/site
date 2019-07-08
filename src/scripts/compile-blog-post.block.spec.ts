import * as path from 'canonical-path';

import { file2, blogPost2Full, blogPost2Excerpt } from '../test/blog-posts.mock';

import * as compiler from './compile';
import compileBlogPostBlock from './compile-blog-post.block';

describe('compile blog post block', () => {
	const mockJoin = jest.spyOn(path, 'join');
	const mockGetLocalFile = jest.spyOn(compiler, 'getLocalFile');
	const mockGetCompiledKey = jest.spyOn(compiler, 'getCompiledKey');

	beforeEach(() => {
		jest.resetAllMocks();

		mockJoin.mockReturnValue('content/blog/en/post.md');
		mockGetLocalFile.mockReturnValue(Promise.resolve(file2));
		mockGetCompiledKey.mockReturnValue('compiledKey');
	});

	it('parses and returns full file', async () => {
		const result = await compileBlogPostBlock({ path: 'blog/en/version-6-dojo.md' });

		expect(result).toEqual(blogPost2Full);
	});

	it('parses and returns excerpt', async () => {
		const result = await compileBlogPostBlock({ path: 'blog/en/version-6-dojo.md', excerpt: true });

		expect(result).toEqual(blogPost2Excerpt);
	});
});
