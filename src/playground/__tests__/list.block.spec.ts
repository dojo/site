import { v } from '@dojo/framework/core/vdom';
import * as fetch from 'node-fetch';

import listBlock, { ExampleMeta } from '../list.block';

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
		example: v('p', { key: 'compiled-3' }, ['TodoMVC']),
		code: v('p', { key: 'compiled-4' }, [v('a', { key: 'compiled-3', href: './todo-mvc' }, ['Link'])]),
		demo: 'https://dojo.github.io/examples/todo-mvc',
		sandbox: true,
		overview: v('p', { key: 'compiled-4' }, [
			'Reference implementation of ',
			v('a', { key: 'compiled-3', target: '_blank', href: 'http://todomvc.com/' }, ['TodoMVC']),
			' built using Dojo packages.'
		])
	},
	{
		exampleName: 'todo-mvc-kitchensink',
		example: v('p', { key: 'compiled-3' }, ['TodoMVC (kitchen sink)']),
		code: v('p', { key: 'compiled-4' }, [v('a', { key: 'compiled-3', href: './todo-mvc-kitchensink' }, ['Link'])]),
		demo: 'https://dojo.github.io/examples/todo-mvc-kitchensink',
		sandbox: false,
		overview: v('p', { key: 'compiled-3' }, ['Feature-enhanced version of TodoMVC built using Dojo packages.'])
	},
	{
		exampleName: 'example3',
		example: v('p', { key: 'compiled-3' }, ['Example 3']),
		code: v('p', { key: 'compiled-4' }, [v('a', { key: 'compiled-3', href: './example3' }, ['Link'])]),
		demo: '',
		sandbox: false,
		overview: v('p', { key: 'compiled-3' }, ['A third example with no demo'])
	}
];

describe('content compiler', () => {
	const mockFetch = jest.spyOn(fetch, 'default');
	const mockText = jest.fn();

	beforeEach(() => {
		jest.resetAllMocks();

		mockFetch.mockResolvedValue({
			text: mockText
		} as any);
		mockText.mockResolvedValue(Promise.resolve(mockReadme));
	});

	it('should process', async () => {
		const result = await listBlock({ branch: 'master' });

		expect(result[0]).toEqual(expectedOutput[0]);
		expect(result[1]).toEqual(expectedOutput[1]);
		expect(result[2]).toEqual(expectedOutput[2]);
	});
});
