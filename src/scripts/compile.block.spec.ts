import * as compiler from './compile';
import compilerBuild from './compile.block';

jest.mock('./compile');

describe('content compiler', () => {
	it('should process file', () => {
		const registeredHandlers = compiler.registerHandlers(compiler.handlers);

		const processMarkdownStub = jest.spyOn(compiler, 'processMarkdown');

		const path = '/path/to/file';
		compilerBuild(path);

		expect(processMarkdownStub).toHaveBeenCalledWith(path, registeredHandlers);

		processMarkdownStub.mockRestore();
	});
});
