import { v } from '@dojo/framework/widget-core/d';
import * as fetch from 'node-fetch';

import examplesBlock, { ExampleMeta } from './examples.block';

const mockReadme = `
Some junk

| Example  | Code  | Demo  | Sandbox | Overview  |
|---|---|---|---|---|
|  TodoMVC  | [Link](./todo-mvc)  | [Link](https://dojo.github.io/examples/todo-mvc)  |  [Link](https://codesandbox.io/s/github/dojo/examples/tree/master/todo-mvc) | Reference implementation of [TodoMVC](http://todomvc.com/) built using Dojo packages.  |
|  TodoMVC (kitchen sink) | [Link](./todo-mvc-kitchensink)  | [Link](https://dojo.github.io/examples/todo-mvc-kitchensink)  |  |    Feature-enhanced version of TodoMVC built using Dojo packages. |

Some other junk
`;

const expectedOutput: ExampleMeta[] = [
	{
		exampleName: 'todo-mvc',
		example: v('p', { key: 'compiled-2' }, ['TodoMVC']),
		code: v('p', { key: 'compiled-6' }, [v('a', { key: 'compiled-5', href: './todo-mvc' }, ['Link'])]),
		demo: v('p', { key: 'compiled-10' }, [
			v('a', { key: 'compiled-9', target: '_blank', href: 'https://dojo.github.io/examples/todo-mvc' }, ['Link'])
		]),
		sandbox: true,
		overview: v('p', { key: 'compiled-14' }, [
			'Reference implementation of ',
			v('a', { key: 'compiled-13', target: '_blank', href: 'http://todomvc.com/' }, ['TodoMVC']),
			' built using Dojo packages.'
		])
	},
	{
		exampleName: 'todo-mvc-kitchensink',
		example: v('p', { key: 'compiled-17' }, ['TodoMVC (kitchen sink)']),
		code: v('p', { key: 'compiled-21' }, [
			v('a', { key: 'compiled-20', href: './todo-mvc-kitchensink' }, ['Link'])
		]),
		demo: v('p', { key: 'compiled-25' }, [
			v(
				'a',
				{ key: 'compiled-24', target: '_blank', href: 'https://dojo.github.io/examples/todo-mvc-kitchensink' },
				['Link']
			)
		]),
		sandbox: false,
		overview: v('p', { key: 'compiled-28' }, ['Feature-enhanced version of TodoMVC built using Dojo packages.'])
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
		const result = await examplesBlock();

		expect(result).toEqual(expectedOutput);
	});
});
