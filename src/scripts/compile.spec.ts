import { w, v } from '@dojo/framework/core/vdom';

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

const mockMarkupContent = `---
key: value
---
# Another Tutorial

[absolute link to another page!](https://example.com/)

[link to another page!](./other-page.md)

[link to another page with anchor!](./other-page.md#anchor)

A github link

[https://github.com/dojo/framework/pull/1](https://github.com/dojo/framework/pull/1)

## Aside
[Aside title="Another tutorial"]
I am another tutorial
[/Aside]

## CodeSandbox Embed
[CodeSandbox url=https://codesandbox.io/embed/github/dojo/examples/tree/master/todo-mvc]
`;

const mockFromMarkupOutput = v('div', { key: 'compiledKey' }, [
	v('h1', { key: 'compiledKey' }, ['Another Tutorial']),
	`
`,
	v('p', { key: 'compiledKey' }, [
		v('a', { href: 'https://example.com/', key: 'compiledKey', target: '_blank' }, [
			'absolute link to another page!'
		])
	]),
	`
`,
	v('p', { key: 'compiledKey' }, [v('a', { href: './other-page', key: 'compiledKey' }, ['link to another page!'])]),
	`
`,
	v('p', { key: 'compiledKey' }, [
		v('a', { href: './other-page', key: 'compiledKey' }, ['link to another page with anchor!'])
	]),
	`
`,
	v('p', { key: 'compiledKey' }, ['A github link']),
	`
`,
	v('p', { key: 'compiledKey' }, [
		v('a', { href: 'https://github.com/dojo/framework/pull/1', key: 'compiledKey', target: '_blank' }, ['#1'])
	]),
	`
`,
	v('h2', { key: 'compiledKey' }, ['Aside']),
	`
`,
	w<Aside>('docs-aside', { title: 'Another tutorial', key: 'compiledKey' }, [
		v('p', { key: 'compiledKey' }, ['I am another tutorial'])
	]),
	`
`,
	v('h2', { key: 'compiledKey' }, ['CodeSandbox Embed']),
	`
`,
	w<CodeSandbox>(
		'docs-codesandbox',
		{ url: 'https://codesandbox.io/embed/github/dojo/examples/tree/master/todo-mvc', key: 'compiledKey' },
		[]
	)
]);

describe('content compiler', () => {
	jest.mock('fs-extra');
	const mockGetCompiledKey = jest.spyOn(compiler, 'getCompiledKey');

	beforeEach(() => {
		jest.resetAllMocks();

		fetch.mockResolvedValue(fetchReturn);
		mockGetCompiledKey.mockReturnValue('compiledKey');
	});

	it('should compile file', async () => {
		const path = resolve(__dirname, mockTutorialSourcePath);

		const readFileStub = jest
			.spyOn(fs, 'readFile')
			.mockReturnValueOnce(Promise.resolve(Buffer.from(mockMarkupContent)));

		const registeredHandlers = compiler.registerHandlers(mockHandlers);
		const content = await compiler.getLocalFile(mockTutorialSourcePath);
		const output = compiler.toDNodes(compiler.fromMarkdown(content, registeredHandlers));

		expect(output).toEqual(mockFromMarkupOutput);

		expect(readFileStub).toBeCalledTimes(1);
		expect(readFileStub.mock.calls[0]).toEqual([path, 'utf-8']);
	});

	it('should skip dnode conversion step', async () => {
		const path = resolve(__dirname, mockTutorialSourcePath);

		const readFileStub = jest
			.spyOn(fs, 'readFile')
			.mockReturnValueOnce(Promise.resolve(Buffer.from(mockMarkupContent)));

		const registeredHandlers = compiler.registerHandlers(mockHandlers);
		const content = await compiler.getLocalFile(mockTutorialSourcePath);
		const output = compiler.fromMarkdown(content, registeredHandlers);

		expect(output.type).toBe('root'); // Should be a root node instead of a VNode

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

		expect(vnode).toEqual(v('div', { class: 'some-class', key: 'compiledKey' }, ['text']));
	});

	it('should build a wnode', () => {
		const tag = 'Aside';
		const props: any = { title: 'some title' };

		const wnode = compiler.pragma(tag, props, ['text']);

		expect(wnode).toEqual(w<Aside>('docs-aside', { title: 'some title', key: 'compiledKey' }, ['text']));
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

	describe('get meta data', () => {
		it('should return return meta data from markdown content', () => {
			expect(compiler.getMetaData(mockMarkupContent)).toEqual({
				key: 'value'
			});
		});
	});

	// Should be the last test as its restores the get compiled key mock
	describe('get compiled key', () => {
		it('should return unique keys', () => {
			mockGetCompiledKey.mockRestore();

			expect(compiler.getCompiledKey()).toBe('compiled-0');
			expect(compiler.getCompiledKey()).toBe('compiled-1');
			expect(compiler.getCompiledKey()).toBe('compiled-2');
			expect(compiler.getCompiledKey()).toBe('compiled-3');
			expect(compiler.getCompiledKey()).toBe('compiled-4');
		});
	});
});
