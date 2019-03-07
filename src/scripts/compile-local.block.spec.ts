import * as path from 'canonical-path';

import * as compiler from './compile';
import compilerBuild from './compile-local.block';

describe('content compiler', () => {
	const filePath = 'path/to/one.md';

	const registeredHandlers = {
		Alert: () => {},
		Aside: () => {},
		CodeBlock: () => {},
		CodeSandbox: () => {}
	};
	const mockRegisterHandlers = jest.spyOn(compiler, 'registerHandlers');
	const mockGetLocalFile = jest.spyOn(compiler, 'getLocalFile');
	const mockFromMarkdown = jest.spyOn(compiler, 'fromMarkdown');
	const mockJoin = jest.spyOn(path, 'join');

	beforeEach(() => {
		jest.resetAllMocks();

		mockRegisterHandlers.mockReturnValue(registeredHandlers);
		mockFromMarkdown.mockResolvedValue('page content');
	});

	it('should proces', async () => {
		mockJoin.mockReturnValueOnce(`/path/to/content/${filePath}`);

		const expectedResult = 'page one content';
		mockGetLocalFile.mockReturnValueOnce(Promise.resolve(expectedResult));
		mockFromMarkdown.mockReturnValueOnce(expectedResult);

		const result = await compilerBuild({
			path: 'path/to/one.md',
			locale: 'en-US'
		});

		expect(result).toEqual(expectedResult);

		expect(mockGetLocalFile).toHaveBeenCalledWith(`/path/to/content/${filePath}`);
		expect(mockFromMarkdown).toHaveBeenCalledWith(expectedResult, registeredHandlers);
		expect(mockJoin).toHaveBeenCalledTimes(1);
	});

	it('should proces with different locale', async () => {
		mockJoin.mockReturnValueOnce(`/path/to/content/:locale:/${filePath}`);

		const expectedResult = 'page one content';
		mockGetLocalFile.mockReturnValueOnce(Promise.resolve(expectedResult));
		mockFromMarkdown.mockReturnValueOnce(expectedResult);

		const result = await compilerBuild({
			path: 'path/to/one.md',
			locale: 'fr'
		});

		expect(result).toEqual(expectedResult);

		expect(mockGetLocalFile).toHaveBeenCalledWith(`/path/to/content/fr/path/to/one.md`);
		expect(mockFromMarkdown).toHaveBeenCalledWith(expectedResult, registeredHandlers);
		expect(mockJoin).toHaveBeenCalledTimes(1);
	});

	it('should proces without locale (defaulting to en-US)', async () => {
		mockJoin.mockReturnValueOnce(`/path/to/content/:locale:/${filePath}`);

		const expectedResult = 'page one content';
		mockGetLocalFile.mockReturnValueOnce(Promise.resolve(expectedResult));
		mockFromMarkdown.mockReturnValueOnce(expectedResult);

		const result = await compilerBuild({
			path: 'path/to/one.md'
		});

		expect(result).toEqual(expectedResult);

		expect(mockGetLocalFile).toHaveBeenCalledWith(`/path/to/content/en/path/to/one.md`);
		expect(mockFromMarkdown).toHaveBeenCalledWith(expectedResult, registeredHandlers);
		expect(mockJoin).toHaveBeenCalledTimes(1);
	});
});
