import { v } from '@dojo/framework/widget-core/d';
import * as fetch from 'node-fetch';

import * as compiler from './compile';

import examplesBlock, { ExampleMeta } from './examples.block';

const mockReadme = `
Some junk

| Example  | Code  | Demo  | Sandbox | Overview  |
|---|---|---|---|---|
|  TodoMVC  | [Link](./todo-mvc)  | [Link](https://dojo.github.io/examples/todo-mvc)  |  [Link](https://codesandbox.io/s/github/dojo/examples/tree/master/todo-mvc) | Reference implementation of [TodoMVC](http://todomvc.com/) built using Dojo packages.  |
|  TodoMVC (kitchen sink) | [Link](./todo-mvc-kitchensink)  | [Link](https://dojo.github.io/examples/todo-mvc-kitchensink)  |  |    Feature-enhanced version of TodoMVC built using Dojo packages. |
|  Example 3 | [Link](./example3) | No demo |  | A third example with no demo |

Some other junk
`;

const expectedOutput: ExampleMeta[] = [
	{
		exampleName: 'todo-mvc',
		example: v('p', { key: 'compiledKey' }, ['TodoMVC']),
		code: v('p', { key: 'compiledKey' }, [v('a', { key: 'compiledKey', href: './todo-mvc' }, ['Link'])]),
		demo: 'https://dojo.github.io/examples/todo-mvc',
		sandbox: true,
		overview: v('p', { key: 'compiledKey' }, [
			'Reference implementation of ',
			v('a', { key: 'compiledKey', target: '_blank', href: 'http://todomvc.com/' }, ['TodoMVC']),
			' built using Dojo packages.'
		])
	},
	{
		exampleName: 'todo-mvc-kitchensink',
		example: v('p', { key: 'compiledKey' }, ['TodoMVC (kitchen sink)']),
		code: v('p', { key: 'compiledKey' }, [
			v('a', { key: 'compiledKey', href: './todo-mvc-kitchensink' }, ['Link'])
		]),
		demo: 'https://dojo.github.io/examples/todo-mvc-kitchensink',
		sandbox: false,
		overview: v('p', { key: 'compiledKey' }, ['Feature-enhanced version of TodoMVC built using Dojo packages.'])
	},
	{
		exampleName: 'example3',
		example: v('p', { key: 'compiledKey' }, ['Example 3']),
		code: v('p', { key: 'compiledKey' }, [
			v('a', { key: 'compiledKey', href: './example3' }, ['Link'])
		]),
		demo: '',
		sandbox: false,
		overview: v('p', { key: 'compiledKey' }, ['A third example with no demo'])
	}
];

describe('content compiler', () => {
	const mockFetch = jest.spyOn(fetch, 'default');
	const mockText = jest.fn();
	const mockGetCompiledKey = jest.spyOn(compiler, 'getCompiledKey');

	beforeEach(() => {
		jest.resetAllMocks();

		mockFetch.mockResolvedValue({
			text: mockText
		} as any);
		mockText.mockResolvedValue(Promise.resolve(mockReadme));
		mockGetCompiledKey.mockReturnValue('compiledKey');
	});

	it('should process', async () => {
		const result = await examplesBlock();

		expect(result).toEqual(expectedOutput);
	});
});
