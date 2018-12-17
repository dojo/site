import { w } from '@dojo/framework/widget-core/d';
import * as fs from 'fs-extra';
import { resolve } from 'path';
import * as compiler from './compile';
import * as parser from './regions/parser';
import { add } from '@dojo/framework/has/has';

export const mockHandlers: Handler[] = [
	{ type: 'Aside' },
	{ type: 'Task' },
	{ type: 'Instruction' },
	{ type: 'CodeBlock', inline: true },
	{ type: 'CodeSandbox', inline: true },
	{ type: 'Metadata', inline: true }
];

const mockHandlersOutput: { [type: string]: HandlerFunction } = {
	Aside: (h, node) => h(node),
	Task: (h, node) => h(node),
	Instruction: (h, node) => h(node),
	CodeBlock: (h, node) => h(node),
	CodeSandbox: (h, node) => h(node),
	Metadata: (h, node) => h(node)
};

const mockManifestJson = {
	tutorials: [
		{
			name: 'Another Tutorial',
			path: './tutorials/another-tutorial.md'
		}
	]
};

const mockManifestJsonPath = '../../content/manifest.json';
const mockTutorialSourcePath = '../../content/tutorials/another-tutorial.md';
const mockExampleFile = '../../content/examples/tutorial-2-finished/src/widgets/App.tsx';

const mockBuildJson: { [section: string]: { [filePath: string]: string } } = {
	tutorials: {}
};
mockBuildJson.tutorials[mockExampleFile] = './tutorials/another-tutorial.md';

const mockListOutput = `export default [{"name: 'Another Tutorial',"path: 'another-tutorial"}];`;

const mockMarkupContent = `# Another Tutorial

## Aside
[Aside title="Another tutorial"]
I am another tutorial
[/Aside]

## CodeSandbox Embed
[CodeSandbox url=https://codesandbox.io/embed/github/dojo/examples/tree/master/todo-mvc]
`;

const mockFromMarkupOutput = {
	tag: 'div',
	deferredPropertiesCallback: undefined,
	originalProperties: {},
	children: [
		{
			tag: 'h1',
			deferredPropertiesCallback: undefined,
			originalProperties: {},
			children: ['Another Tutorial'],
			properties: {
				key: 'compiled-2'
			},
			type: '__VNODE_TYPE'
		},
		`
`,
		{
			tag: 'h2',
			deferredPropertiesCallback: undefined,
			originalProperties: {},
			children: ['Aside'],
			properties: {
				key: 'compiled-3'
			},
			type: '__VNODE_TYPE'
		},
		`
`,
		{
			children: [
				{
					tag: 'p',
					deferredPropertiesCallback: undefined,
					originalProperties: {},
					children: ['I am another tutorial'],
					properties: {
						key: 'compiled-4'
					},
					type: '__VNODE_TYPE'
				}
			],
			widgetConstructor: 'docs-aside',
			properties: {
				title: 'Another tutorial',
				key: 'compiled-5'
			},
			type: '__WNODE_TYPE'
		},
		`
`,
		{
			tag: 'h2',
			deferredPropertiesCallback: undefined,
			originalProperties: {},
			children: ['CodeSandbox Embed'],
			properties: {
				key: 'compiled-6'
			},
			type: '__VNODE_TYPE'
		},
		`
`,
		{
			children: [],
			widgetConstructor: 'docs-codesandbox',
			properties: {
				url: 'https://codesandbox.io/embed/github/dojo/examples/tree/master/todo-mvc',
				key: 'compiled-7'
			},
			type: '__WNODE_TYPE'
		}
	],
	properties: {
		key: 'compiled-8'
	},
	type: '__VNODE_TYPE'
};

describe('content compiler', () => {
	jest.mock(mockManifestJsonPath, () => mockManifestJson);
	jest.mock('fs-extra');

	beforeEach(() => {
		compiler.key = 0;
		jest.resetAllMocks();
	});

	it('should compile file', () => {
		const path = resolve(__dirname, mockTutorialSourcePath);

		const readFileSyncStub = jest.spyOn(fs, 'readFileSync').mockReturnValueOnce(mockMarkupContent);

		const registeredHandlers = compiler.registerHandlers(mockHandlers);
		const output = compiler.processMarkdown(mockTutorialSourcePath, registeredHandlers);

		expect(output).toEqual(mockFromMarkupOutput);

		expect(readFileSyncStub).toBeCalledTimes(1);
		expect(readFileSyncStub.mock.calls[0]).toEqual([path, 'utf-8']);
	});

	it('should register handlers', () => {
		const registeredHandlers = compiler.registerHandlers(mockHandlers);
		expect(Object.keys(registeredHandlers)).toEqual(Object.keys(mockHandlersOutput));
	});

	it('should build a vnode', () => {
		const tag = 'div';
		const props = { class: 'some-class' };

		const vnode = compiler.pragma(tag, props, ['text']);

		expect(vnode).toEqual({
			tag: 'div',
			deferredPropertiesCallback: undefined,
			originalProperties: {},
			children: ['text'],
			properties: { class: 'some-class', key: 'compiled-9' },
			type: '__VNODE_TYPE'
		});
	});

	it('should build a wnode', () => {
		const tag = 'Aside';
		const props: any = { title: 'some title' };

		const wnode = compiler.pragma(tag, props, ['text']);

		expect(wnode).toEqual({
			children: ['text'],
			widgetConstructor: 'docs-aside',
			properties: { title: 'some title', key: 'compiled-10' },
			type: '__WNODE_TYPE'
		});
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

		compiler.widgets['docs-codeblock'].mockRestore();
	});
});
