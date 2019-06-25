import { v, w } from '@dojo/framework/core/vdom';

import * as path from 'canonical-path';

import * as compiler from './compile';
import compileBlogPostBlock from './compile-blog-post.block';

const blog = `
---
title: Blog Title
date: 2018-10-15 12:00:00
author: Paul Shannon
---
## Blog Title

A excerpt for this blog post!

[BlogImage path="path/to/an/image.png"]

<!-- more -->

## After the break!

More information
`;

const excerpt = [
	v('h2', { key: 'compiledKey' }, ['Blog Title']),
	`
`,
	v('p', { key: 'compiledKey' }, ['A excerpt for this blog post!']),
	`
`,
	w('docs-blogimage', { key: 'compiledKey', path: 'path/to/an/image.png' } as any, [])
];

const restOfPost = [
	`
`,
	v('h2', { key: 'compiledKey' }, ['After the break!']),
	`
`,
	v('p', { key: 'compiledKey' }, ['More information'])
];

const meta = {
	title: 'Blog Title',
	date: new Date('2018-10-15T12:00:00.000Z'),
	author: 'Paul Shannon'
};

const expectedFullOutput = {
	content: v('div', { key: 'compiledKey' }, [...excerpt, ...restOfPost]),
	meta
};

const expectedExcerptOutput = {
	content: v('div', { key: 'compiledKey' }, [...excerpt]),
	meta
};

describe('compile blog post block', () => {
	const mockJoin = jest.spyOn(path, 'join');
	const mockGetLocalFile = jest.spyOn(compiler, 'getLocalFile');
	const mockGetCompiledKey = jest.spyOn(compiler, 'getCompiledKey');

	beforeEach(() => {
		jest.resetAllMocks();

		mockJoin.mockReturnValue('content/blog/en/post.md');
		mockGetLocalFile.mockReturnValue(Promise.resolve(blog));
		mockGetCompiledKey.mockReturnValue('compiledKey');
	});

	it('parses and returns full file', async () => {
		const result = await compileBlogPostBlock({ path: 'blog/en/post.md' });

		expect(result).toEqual(expectedFullOutput);
	});

	it('parses and returns excerpt', async () => {
		const result = await compileBlogPostBlock({ path: 'blog/en/post.md', excerpt: true });

		expect(result).toEqual(expectedExcerptOutput);
	});
});
