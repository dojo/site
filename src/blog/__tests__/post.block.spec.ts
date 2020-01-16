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
			key: 'compiled-6'
		},
		[
			v(
				'a',
				{
					key: 'compiled-5',
					'aria-hidden': 'true',
					href: '#blog-title-1'
				},
				[
					v(
						'svg',
						{
							classes: 'refguide-link',
							height: '16',
							key: 'compiled-4',
							width: '16'
						},
						[
							v('path', {
								d:
									'M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z',
								key: 'compiled-3'
							})
						]
					)
				]
			),
			'Blog Title 1'
		]
	);

const content = () =>
	v(
		'p',
		{
			key: 'compiled-7'
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
			key: 'compiled-8'
		},
		[top(), content()]
	),
	...meta()
};

const expectedExcerptOutput = {
	content: v(
		'section',
		{
			key: 'compiled-7'
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
