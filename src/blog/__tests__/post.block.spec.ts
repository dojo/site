import { v, w } from '@dojo/framework/core/vdom';

import * as path from 'canonical-path';
import * as fs from 'fs-extra';

import postBlock from '../post.block';

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
	v('h2', { key: 'compiled-3' }, ['Blog Title']),
	`
`,
	v('p', { key: 'compiled-4' }, ['A excerpt for this blog post!']),
	`
`,
	w('docs-blogimage', { key: 'compiled-5', path: 'path/to/an/image.png' } as any, [])
];

const restOfPost = [
	`
`,
	v('h2', { key: 'compiled-6' }, ['After the break!']),
	`
`,
	v('p', { key: 'compiled-7' }, ['More information'])
];

const meta = {
	title: 'Blog Title',
	date: new Date('2018-10-15T12:00:00.000Z'),
	author: 'Paul Shannon'
};

const expectedFullOutput = {
	content: v('div', { key: 'compiled-8' }, [...excerpt, ...restOfPost]),
	meta
};

const expectedExcerptOutput = {
	content: v('div', { key: 'compiled-6' }, [...excerpt]),
	meta
};

describe('compile blog post block', () => {
	const mockJoin = jest.spyOn(path, 'join');
	const mockReadFile: jest.SpyInstance<Promise<string>> = jest.spyOn(fs, 'readFile') as any;

	beforeEach(() => {
		jest.resetAllMocks();

		mockJoin.mockReturnValue('content/blog/en/post.md');
		mockReadFile.mockResolvedValue(blog);
	});

	it('parses and returns full file', async () => {
		const result = await postBlock({ path: 'blog/en/post.md' });

		expect(result).toEqual(expectedFullOutput);
	});

	it('parses and returns excerpt', async () => {
		const result = await postBlock({ path: 'blog/en/post.md', excerpt: true });

		expect(result).toEqual(expectedExcerptOutput);
	});
});
