import * as fs from 'fs-extra';

import postBlock from '../post.block';
import { v } from '@dojo/framework/core/vdom';

const file = `
---
title: Blog Title 1
date: 2018-10-15 12:00:00
author: Paul Shannon
---
## Blog Title 1

<!-- more -->

Content!
`;

const top = () =>
	v(
		'h2',
		{
			id: 'blog-title-1',
			key: 'compiled-3'
		},
		['Blog Title 1']
	);

const content = () =>
	v(
		'p',
		{
			key: 'compiled-4'
		},
		['Content!']
	);

const meta = () => ({
	meta: {
		author: 'Paul Shannon',
		date: new Date('2018-10-15T12:00:00.000Z'),
		title: 'Blog Title 1'
	}
});

const expectedOutput = {
	content: v(
		'section',
		{
			key: 'compiled-5'
		},
		[top(), content()]
	),
	...meta()
};

const expectedExcerptOutput = {
	content: v(
		'section',
		{
			key: 'compiled-4'
		},
		[top()]
	),
	...meta()
};

jest.mock('fs');
jest.mock('fs-extra');

describe('post block', () => {
	const mockExistsSync = jest.spyOn(fs, 'existsSync');
	const mockReadFile: jest.SpyInstance<Promise<string>> = jest.spyOn(fs, 'readFile') as any;

	beforeEach(() => {
		jest.resetAllMocks();

		mockExistsSync.mockReturnValue(true);
		mockReadFile.mockResolvedValue(file);
	});

	it('returns a compiled full blog post', async () => {
		const result = await postBlock({ path: 'blog/en/file1.md' });

		expect(result).toEqual(expectedOutput);
	});

	it('returns a compiled blog post excerpt', async () => {
		const result = await postBlock({ path: 'blog/en/file1.md', excerpt: true });

		expect(result).toEqual(expectedExcerptOutput);
	});
});
