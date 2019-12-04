import * as fetch from 'node-fetch';

import sectionsBlock from '../sections.block';

const file = `
# Header 1

Content for 1!

# Header 2

Content for 2!
`;

const expectedOutput = [
	{
		param: 'header-1',
		title: 'Header 1'
	},
	{
		param: 'header-2',
		title: 'Header 2'
	}
];

const settings = {
	repo: 'dojo/framework',
	branch: 'master',
	path: 'path/to/file/:locale:',
	page: 'introduction',
	language: 'en',
	locale: 'en'
};

jest.mock('fs');
jest.mock('node-fetch');

describe('sections block', () => {
	const mockFetch = jest.spyOn(fetch, 'default');

	beforeEach(() => {
		jest.resetAllMocks();
		mockFetch.mockResolvedValue({
			ok: true,
			text: () => file
		} as any);
	});

	it('gets sections', async () => {
		const result = await sectionsBlock(settings);

		expect(mockFetch).toHaveBeenCalledWith(
			'https://raw.githubusercontent.com/dojo/framework/master/path/to/file/en/introduction.md'
		);

		expect(result).toEqual(expectedOutput);
	});

	it('returns empty array if page not found', async () => {
		mockFetch.mockReset();
		mockFetch.mockResolvedValue({
			ok: false
		} as any);
		const result = await sectionsBlock({
			...settings,
			page: 'header-3'
		});

		expect(result).toEqual([]);
	});

	it('gets content for a different language', async () => {
		const result = await sectionsBlock({
			...settings,
			language: 'zh',
			locale: 'zh-CN'
		});

		expect(mockFetch).toHaveBeenCalledWith(
			'https://raw.githubusercontent.com/dojo/framework/master/path/to/file/zh/introduction.md'
		);

		expect(result).toEqual(expectedOutput);
	});

	it('gets content from locale when language file not found', async () => {
		mockFetch.mockReset();
		mockFetch
			.mockResolvedValueOnce({
				ok: false
			} as any)
			.mockResolvedValueOnce({
				ok: true,
				text: () => file
			} as any);
		const result = await sectionsBlock({
			...settings,
			language: 'zh',
			locale: 'zh-CN'
		});

		expect(mockFetch).toHaveBeenCalledWith(
			'https://raw.githubusercontent.com/dojo/framework/master/path/to/file/zh-CN/introduction.md'
		);

		expect(result).toEqual(expectedOutput);
	});

	it('defaults to english when language and locale files not found', async () => {
		mockFetch.mockReset();
		mockFetch
			.mockResolvedValueOnce({
				ok: false
			} as any)
			.mockResolvedValueOnce({
				ok: false
			} as any)
			.mockResolvedValueOnce({
				ok: true,
				text: () => file
			} as any);
		const result = await sectionsBlock(settings);

		expect(mockFetch).toHaveBeenCalledWith(
			'https://raw.githubusercontent.com/dojo/framework/master/path/to/file/en/introduction.md'
		);

		expect(result).toEqual(expectedOutput);
	});
});
