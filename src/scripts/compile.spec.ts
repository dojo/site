import { w, v } from '@dojo/framework/widget-core/d';
import * as fs from 'fs-extra';
import { resolve } from 'path';
import * as compiler from './compile';
import Aside from '../widgets/content/Aside';
import CodeSandbox from '../widgets/code/CodeSandbox';

const fetch = require('node-fetch').default;
jest.mock('node-fetch');

const textReturn = jest.fn();
let fetchReturn: any = {
	text: textReturn
};

export const mockHandlers: compiler.Handler[] = [
	{ type: 'Aside' },
	{ type: 'Task' },
	{ type: 'Instruction' },
	{ type: 'CodeBlock', inline: true },
	{ type: 'CodeSandbox', inline: true },
	{ type: 'Metadata', inline: true }
];

const mockHandlersOutput: { [type: string]: compiler.HandlerFunction } = {
	Aside: (h, node) => h(node),
	Task: (h, node) => h(node),
	Instruction: (h, node) => h(node),
	CodeBlock: (h, node) => h(node),
	CodeSandbox: (h, node) => h(node),
	Metadata: (h, node) => h(node)
};

const mockTutorialSourcePath = '../../content/tutorials/another-tutorial.md';
const mockExampleFile = '../../content/examples/tutorial-2-finished/src/widgets/App.tsx';

const mockBuildJson: { [section: string]: { [filePath: string]: string } } = {
	tutorials: {}
};
mockBuildJson.tutorials[mockExampleFile] = './tutorials/another-tutorial.md';

const mockMarkupContent = `# Another Tutorial

[absolute link to another page!](https://example.com/)

[link to another page!](./other-page.md)

[link to another page with anchor!](./other-page.md#anchor)

## Aside
[Aside title="Another tutorial"]
I am another tutorial
[/Aside]

## CodeSandbox Embed
[CodeSandbox url=https://codesandbox.io/embed/github/dojo/examples/tree/master/todo-mvc]
`;

const mockFromMarkupOutput = v('div', { key: 'compiled-14' }, [
	v('h1', { key: 'compiled-2' }, ['Another Tutorial']),
	`
`,
	v('p', { key: 'compiled-4' }, [
		v('a', { href: 'https://example.com/', key: 'compiled-3', target: '_blank' }, [
			'absolute link to another page!'
		])
	]),
	`
`,
	v('p', { key: 'compiled-6' }, [v('a', { href: './other-page', key: 'compiled-5' }, ['link to another page!'])]),
	`
`,
	v('p', { key: 'compiled-8' }, [
		v('a', { href: './other-page', key: 'compiled-7' }, ['link to another page with anchor!'])
	]),
	`
`,
	v('h2', { key: 'compiled-9' }, ['Aside']),
	`
`,
	w<Aside>('docs-aside', { title: 'Another tutorial', key: 'compiled-11' }, [
		v('p', { key: 'compiled-10' }, ['I am another tutorial'])
	]),
	`
`,
	v('h2', { key: 'compiled-12' }, ['CodeSandbox Embed']),
	`
`,
	w<CodeSandbox>(
		'docs-codesandbox',
		{ url: 'https://codesandbox.io/embed/github/dojo/examples/tree/master/todo-mvc', key: 'compiled-13' },
		[]
	)
]);

describe('content compiler', () => {
	jest.mock('fs-extra');

	beforeEach(() => {
		jest.resetAllMocks();

		fetch.mockResolvedValue(fetchReturn);
	});

	it('should compile file', async () => {
		const path = resolve(__dirname, mockTutorialSourcePath);

		const readFileStub = jest
			.spyOn(fs, 'readFile')
			.mockReturnValueOnce(Promise.resolve(Buffer.from(mockMarkupContent)));

		const registeredHandlers = compiler.registerHandlers(mockHandlers);
		const content = await compiler.getLocalFile(mockTutorialSourcePath);
		const output = compiler.fromMarkdown(content, registeredHandlers);

		expect(output).toEqual(mockFromMarkupOutput);

		expect(readFileStub).toBeCalledTimes(1);
		expect(readFileStub.mock.calls[0]).toEqual([path, 'utf-8']);
	});

	it('should register handlers', () => {
		const registeredHandlers = compiler.registerHandlers(mockHandlers);
		expect(Object.keys(registeredHandlers)).toEqual(Object.keys(mockHandlersOutput));
	});

	it('should build a vnode', () => {
		const tag = 'div';
		const props = { class: 'some-class' };

		const vnode = compiler.pragma(tag, props, ['text']);

		expect(vnode).toEqual(v('div', { class: 'some-class', key: 'compiled-15' }, ['text']));
	});

	it('should build a wnode', () => {
		const tag = 'Aside';
		const props: any = { title: 'some title' };

		const wnode = compiler.pragma(tag, props, ['text']);

		expect(wnode).toEqual(w<Aside>('docs-aside', { title: 'some title', key: 'compiled-16' }, ['text']));
	});

	it('should build a docs-codeblock widget', () => {
		const tag = 'CodeBlock';
		const props: any = { path: 'path/to/file', region: 'RegionName', language: 'tsx' };
		const fromHtmlOuput = 'Dummy output';
		const expectedOutput = w('docs-codeblock', props, [fromHtmlOuput]);

		const regionBuilderStub = jest.fn().mockReturnValue(expectedOutput);
		compiler.widgets['docs-codeblock'] = regionBuilderStub;

		const wnode = compiler.pragma(tag, props, []);

		expect(wnode).toEqual(expectedOutput);

		regionBuilderStub.mockRestore();
	});

	describe('set locale', () => {
		it('should replace :locale: with locale indicated', async () => {
			const url = '/path/to/:locale:/file.md';

			expect(compiler.setLocale(url, 'en')).toBe('/path/to/en/file.md');
			expect(compiler.setLocale(url, 'fr')).toBe('/path/to/fr/file.md');
		});

		it('should not change non-locale url', async () => {
			expect(compiler.setLocale('/path/to/file.md', 'en')).toBe('/path/to/file.md');
		});
	});
});
