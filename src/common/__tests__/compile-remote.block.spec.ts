import * as fetch from 'node-fetch';

import mockMarkdown from '../markdown';
import compileRemoteBlock from '../compile-remote.block';

jest.mock('../../common/markdown');

describe('content compiler', () => {
	const githubContent = 'github page content';
	const mockFetch = jest.spyOn(fetch, 'default');
	const mockText = jest.fn();

	beforeEach(() => {
		jest.resetAllMocks();

		mockFetch.mockResolvedValue({
			text: mockText
		} as any);
		mockText.mockResolvedValue(Promise.resolve(githubContent));
		(mockMarkdown as jest.Mock).mockReturnValue('page content');
	});

	it('should process', async () => {
		const expectedResult = 'page content';
		(mockMarkdown as jest.Mock).mockReturnValueOnce(expectedResult);

		const result = await compileRemoteBlock({
			repo: 'dojo/framework',
			path: 'docs/:locale:/i18n/index.md',
			locale: 'en'
		});

		expect(result).toEqual(expectedResult);
		expect(mockFetch).toHaveBeenCalledWith(
			'https://raw.githubusercontent.com/dojo/framework/master/docs/en/i18n/index.md'
		);
		expect(mockMarkdown).toHaveBeenCalledWith('github page content');
	});

	it('should process with different locale', async () => {
		const expectedResult = 'page content';
		(mockMarkdown as jest.Mock).mockReturnValueOnce(expectedResult);

		const result = await compileRemoteBlock({
			repo: 'dojo/framework',
			path: 'docs/:locale:/i18n/index.md',
			locale: 'fr'
		});

		expect(result).toEqual(expectedResult);
		expect(mockFetch).toHaveBeenCalledWith(
			'https://raw.githubusercontent.com/dojo/framework/master/docs/fr/i18n/index.md'
		);
		expect(mockMarkdown).toHaveBeenCalledWith('github page content');
	});

	it('should process with different branch', async () => {
		const expectedResult = 'page content';
		(mockMarkdown as jest.Mock).mockReturnValueOnce(expectedResult);

		const result = await compileRemoteBlock({
			repo: 'dojo/framework',
			branch: 'branch',
			path: 'docs/:locale:/i18n/index.md',
			locale: 'en'
		});

		expect(result).toEqual(expectedResult);
		expect(mockFetch).toHaveBeenCalledWith(
			'https://raw.githubusercontent.com/dojo/framework/branch/docs/en/i18n/index.md'
		);
		expect(mockMarkdown).toHaveBeenCalledWith('github page content');
	});

	it('should process without locale (defaulting to en-US)', async () => {
		const expectedResult = 'page content';
		(mockMarkdown as jest.Mock).mockReturnValueOnce(expectedResult);

		const result = await compileRemoteBlock({
			repo: 'dojo/framework',
			path: 'docs/:locale:/i18n/index.md'
		});

		expect(result).toEqual(expectedResult);
		expect(mockFetch).toHaveBeenCalledWith(
			'https://raw.githubusercontent.com/dojo/framework/master/docs/en/i18n/index.md'
		);
		expect(mockMarkdown).toHaveBeenCalledWith('github page content');
	});
});
