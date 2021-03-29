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

const mockMarkupOutput = v('section', { key: 'compiled-35' }, [
	v('h1', { key: 'compiled-6', id: 'another-tutorial' }, [
		v('a', { key: 'compiled-5', 'aria-hidden': 'true', href: '#another-tutorial', tabindex: -1 }, [
			v('svg', { width: '16', height: '16', key: 'compiled-4', classes: 'refguide-link' }, [
				v('path', {
					d:
						'M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z',
					key: 'compiled-3'
				})
			])
		]),
		'Another Tutorial'
	]),
	v('p', { key: 'compiled-8' }, [
		v('a', { href: 'https://example.com/', key: 'compiled-7', target: '_blank' }, [
			'absolute link to another page!'
		])
	]),
	v('p', { key: 'compiled-10' }, [v('a', { href: './other-page', key: 'compiled-9' }, ['link to another page!'])]),
	v('p', { key: 'compiled-12' }, [
		v('a', { href: './other-page', key: 'compiled-11' }, ['link to another page with anchor!'])
	]),
	v('p', { key: 'compiled-13' }, ['A github link']),
	v('p', { key: 'compiled-15' }, [
		v('a', { href: 'https://github.com/dojo/framework/pull/1', key: 'compiled-14', target: '_blank' }, ['#1'])
	]),
	v('section', { key: 'compiled-22' }, [
		v('h2', { key: 'compiled-19', id: 'aside' }, [
			v(
				'a',
				{
					'aria-hidden': 'true',
					href: '#aside',
					key: 'compiled-18',
					tabindex: -1
				},
				[
					v('svg', { width: '16', height: '16', key: 'compiled-17', classes: 'refguide-link' }, [
						v('path', {
							d:
								'M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z',
							key: 'compiled-16'
						})
					])
				]
			),
			'Aside'
		]),
		w('docs-aside', { title: 'Another tutorial', key: 'compiled-21' }, [
			v('p', { key: 'compiled-20' }, ['I am another tutorial'])
		])
	]),
	v('section', { key: 'compiled-28' }, [
		v('h2', { key: 'compiled-26', id: 'codesandbox-embed' }, [
			v(
				'a',
				{
					'aria-hidden': 'true',
					href: '#codesandbox-embed',
					key: 'compiled-25',
					tabindex: -1
				},
				[
					v('svg', { width: '16', height: '16', key: 'compiled-24', classes: 'refguide-link' }, [
						v('path', {
							d:
								'M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z',
							key: 'compiled-23'
						})
					])
				]
			),
			'CodeSandbox Embed'
		]),
		w(
			'docs-codesandbox',
			{ url: 'https://codesandbox.io/embed/github/dojo/examples/tree/master/todo-mvc', key: 'compiled-27' },
			[]
		)
	]),
	v('section', { key: 'compiled-34' }, [
		v('h2', { id: 'codeblock', key: 'compiled-32' }, [
			v(
				'a',
				{
					'aria-hidden': 'true',
					href: '#codeblock',
					key: 'compiled-31',
					tabindex: -1
				},
				[
					v('svg', { width: '16', height: '16', key: 'compiled-30', classes: 'refguide-link' }, [
						v('path', {
							d:
								'M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z',
							key: 'compiled-29'
						})
					])
				]
			),
			'CodeBlock'
		]),
		w('docs-codeblock', {}, ['some content from a file'])
	])
]);

const mockMarkupStringOutput = `<section><h1 id=\"another-tutorial\"><a href=\"#another-tutorial\" aria-hidden=\"true\" tabindex=\"-1\"><svg classes=\"refguide-link\" width=\"16\" height=\"16\"><path d=\"M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z\"></path></svg></a>Another Tutorial</h1><p><a href=\"https://example.com/\" target=\"_blank\">absolute link to another page!</a></p><p><a href=\"./other-page\">link to another page!</a></p><p><a href=\"./other-page\">link to another page with anchor!</a></p><p>A github link</p><p><a href=\"https://github.com/dojo/framework/pull/1\" target=\"_blank\">#1</a></p><section><h2 id=\"aside\"><a href=\"#aside\" aria-hidden=\"true\" tabindex=\"-1\"><svg classes=\"refguide-link\" width=\"16\" height=\"16\"><path d=\"M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z\"></path></svg></a>Aside</h2><Aside title=\"Another tutorial\"><p>I am another tutorial</p></Aside></section><section><h2 id=\"codesandbox-embed\"><a href=\"#codesandbox-embed\" aria-hidden=\"true\" tabindex=\"-1\"><svg classes=\"refguide-link\" width=\"16\" height=\"16\"><path d=\"M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z\"></path></svg></a>CodeSandbox Embed</h2><CodeSandbox url=\"https://codesandbox.io/embed/github/dojo/examples/tree/master/todo-mvc\"></CodeSandbox></section><section><h2 id=\"codeblock\"><a href=\"#codeblock\" aria-hidden=\"true\" tabindex=\"-1\"><svg classes=\"refguide-link\" width=\"16\" height=\"16\"><path d=\"M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z\"></path></svg></a>CodeBlock</h2><CodeBlock path=\"tutorial-2-finished/src/widgets/App.tsx\" language=\"tsx\"></CodeBlock></section></section>`;

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
				key: 'compiled-33',
				language: 'tsx',
				path: 'tutorial-2-finished/src/widgets/App.tsx'
			},
			undefined
		);
	});

	it('should convert to string instead of DNodes', async () => {
		const output = markdown(mockMarkupContent, true, 'string');

		expect(output).toEqual(mockMarkupStringOutput);
	});
});
