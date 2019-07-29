import { w, v } from '@dojo/framework/core/vdom';

import markdown from '../markdown';
import * as parser from '../regions/parser';

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

## CodeBlock
[CodeBlock path=tutorial-2-finished/src/widgets/App.tsx, language=tsx]
`;

const mockMarkupOutput = v('section', { key: 'compiled-23' }, [
	v('h1', { key: 'compiled-3' }, ['Another Tutorial']),
	v('p', { key: 'compiled-5' }, [
		v('a', { href: 'https://example.com/', key: 'compiled-4', target: '_blank' }, [
			'absolute link to another page!'
		])
	]),
	v('p', { key: 'compiled-7' }, [v('a', { href: './other-page', key: 'compiled-6' }, ['link to another page!'])]),
	v('p', { key: 'compiled-9' }, [
		v('a', { href: './other-page', key: 'compiled-8' }, ['link to another page with anchor!'])
	]),
	v('p', { key: 'compiled-10' }, ['A github link']),
	v('p', { key: 'compiled-12' }, [
		v('a', { href: 'https://github.com/dojo/framework/pull/1', key: 'compiled-11', target: '_blank' }, ['#1'])
	]),
	v('section', { key: 'compiled-16' }, [
		v('h2', { key: 'compiled-13' }, ['Aside']),
		w('docs-aside', { title: 'Another tutorial', key: 'compiled-15' }, [
			v('p', { key: 'compiled-14' }, ['I am another tutorial'])
		])
	]),
	v('section', { key: 'compiled-19' }, [
		v('h2', { key: 'compiled-17' }, ['CodeSandbox Embed']),
		w(
			'docs-codesandbox',
			{ url: 'https://codesandbox.io/embed/github/dojo/examples/tree/master/todo-mvc', key: 'compiled-18' },
			[]
		)
	]),
	v('section', { key: 'compiled-22' }, [
		v('h2', { key: 'compiled-20' }, ['CodeBlock']),
		w('docs-codeblock', {}, ['some content from a file'])
	])
]);

const mockMarkupStringOutput = `<section><h1>Another Tutorial</h1><p><a href=\"https://example.com/\" target=\"_blank\">absolute link to another page!</a></p><p><a href=\"./other-page\">link to another page!</a></p><p><a href=\"./other-page\">link to another page with anchor!</a></p><p>A github link</p><p><a href=\"https://github.com/dojo/framework/pull/1\" target=\"_blank\">#1</a></p><section><h2>Aside</h2><Aside title=\"Another tutorial\"><p>I am another tutorial</p></Aside></section><section><h2>CodeSandbox Embed</h2><CodeSandbox url=\"https://codesandbox.io/embed/github/dojo/examples/tree/master/todo-mvc\"></CodeSandbox></section><section><h2>CodeBlock</h2><CodeBlock path=\"tutorial-2-finished/src/widgets/App.tsx\" language=\"tsx\"></CodeBlock></section></section>`;

describe('content compiler', () => {
	let mockRegionBuilder: jest.SpyInstance;
	beforeEach(() => {
		mockRegionBuilder = jest.spyOn(parser, 'regionBuilder');
		mockRegionBuilder.mockReturnValue(w('docs-codeblock', {}, ['some content from a file']));
	});

	it('should compile file', async () => {
		const output = markdown(mockMarkupContent);

		expect(output).toEqual(mockMarkupOutput);

		expect(mockRegionBuilder).toHaveBeenCalledWith(
			'docs-codeblock',
			{
				key: 'compiled-21',
				language: 'tsx',
				path: 'tutorial-2-finished/src/widgets/App.tsx'
			},
			undefined
		);
	});

	it('should convert to string instead of DNodes', async () => {
		const output = markdown(mockMarkupContent, 'string');

		expect(output).toEqual(mockMarkupStringOutput);
	});
});
