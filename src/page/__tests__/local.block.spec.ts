import * as path from 'canonical-path';
import * as fs from 'fs-extra';

import mockMarkdown from '../../common/markdown';
import localBlock from '../local.block';

jest.mock('../../common/markdown');

describe('content compiler', () => {
	const filePath = 'path/to/one.md';
	const mockReadFile: jest.SpyInstance<Promise<string>> = jest.spyOn(fs, 'readFile') as any;
	const mockJoin = jest.spyOn(path, 'join');

	beforeEach(() => {
		jest.resetAllMocks();

		(mockMarkdown as jest.Mock).mockReturnValue('page content');
	});

	it('should process', async () => {
		mockJoin.mockReturnValueOnce(`/path/to/content/${filePath}`);

		const expectedResult = '<p>page one content</p>';
		mockReadFile.mockResolvedValueOnce(expectedResult);
		(mockMarkdown as jest.Mock).mockReturnValueOnce(expectedResult);

		const result = await localBlock({
			path: 'path/to/one.md',
			locale: 'en-US'
		});

		expect(result).toEqual(expectedResult);

		expect(mockReadFile).toHaveBeenCalledWith(`/path/to/content/${filePath}`, 'utf-8');
		expect(mockMarkdown).toHaveBeenCalledWith(expectedResult);
		expect(mockJoin).toHaveBeenCalledTimes(1);
	});

	it('should process with different locale', async () => {
		mockJoin.mockReturnValueOnce(`/path/to/content/:locale:/${filePath}`);

		const expectedResult = '<p>page one content</p>';
		mockReadFile.mockResolvedValueOnce(expectedResult);
		(mockMarkdown as jest.Mock).mockReturnValueOnce(expectedResult);

		const result = await localBlock({
			path: 'path/to/one.md',
			locale: 'fr'
		});

		expect(result).toEqual(expectedResult);

		expect(mockReadFile).toHaveBeenCalledWith(`/path/to/content/fr/path/to/one.md`, 'utf-8');
		expect(mockMarkdown).toHaveBeenCalledWith(expectedResult);
		expect(mockJoin).toHaveBeenCalledTimes(1);
	});

	it('should process without locale (defaulting to en-US)', async () => {
		mockJoin.mockReturnValueOnce(`/path/to/content/:locale:/${filePath}`);

		const expectedResult = '<p>page one content</p>';
		mockReadFile.mockResolvedValueOnce(expectedResult);
		(mockMarkdown as jest.Mock).mockReturnValueOnce(expectedResult);

		const result = await localBlock({
			path: 'path/to/one.md'
		});

		expect(result).toEqual(expectedResult);

		expect(mockReadFile).toHaveBeenCalledWith(`/path/to/content/en/path/to/one.md`, 'utf-8');
		expect(mockMarkdown).toHaveBeenCalledWith(expectedResult);
		expect(mockJoin).toHaveBeenCalledTimes(1);
	});
});
