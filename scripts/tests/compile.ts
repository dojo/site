import { w } from '@dojo/framework/widget-core/d';
import * as mockery from 'mockery';
import * as sinon from 'sinon';
import chalk from 'chalk';

import { HandlerFunction } from '../compile';

const { describe, it, beforeEach, afterEach } = intern.getInterface('bdd');
const { assert } = intern.getPlugin('chai');

const COMPILE_SCRIPT_PATH = '../compile';

const handlersOutput: { [type: string]: HandlerFunction } = {
	Aside: (h, node) => h(node),
	Task: (h, node) => h(node),
	Instruction: (h, node) => h(node),
	CodeBlock: (h, node) => h(node),
	CodeSandbox: (h, node) => h(node),
	Metadata: (h, node) => h(node)
};

const manifestJson = {
	tutorials: [
		{
			name: 'Another Tutorial',
			path: './tutorials/another-tutorial.md'
		}
	],
	blog : [
		{
			name: "Announcing Version 4 of Dojo",
			path: "./blog/2018/10/15/2018-10-15-Version-4-Dojo.md"
		}
	]
};

const listOutput = `export default [{"name":"Another Tutorial","path":"another-tutorial"}];`;

const blogMarkupContent = `---
title: A example blog post
date: 2018-10-15 12:00:00
description: A description of the post
imageUrl: some/image/path.jpg
author: someone
---
## A test blog post

Some content

<!-- more -->

## Another heading
`;

const markupContent = `# Another Tutorial

## Aside
[Aside title="Another tutorial"]
I am another tutorial
[/Aside]

## CodeSandbox Embed
[CodeSandbox url=https://codesandbox.io/embed/github/dojo/examples/tree/master/todo-mvc]
`;

const getBlogHyperscriptOutput = '';
const getTutorialHyperscriptOutput =
	'{"tag":"div","originalProperties":{},"children":[{"tag":"h1","originalProperties":{},"children":["Another Tutorial"],"properties":{"key":"compiled-2"},"type":"__VNODE_TYPE"},"\\n",{"tag":"h2","originalProperties":{},"children":["Aside"],"properties":{"key":"compiled-3"},"type":"__VNODE_TYPE"},"\\n",{"children":[{"tag":"p","originalProperties":{},"children":["I am another tutorial"],"properties":{"key":"compiled-4"},"type":"__VNODE_TYPE"}],"widgetConstructor":"docs-aside","properties":{"title":"Another tutorial","key":"compiled-5"},"type":"__WNODE_TYPE"},"\\n",{"tag":"h2","originalProperties":{},"children":["CodeSandbox Embed"],"properties":{"key":"compiled-6"},"type":"__VNODE_TYPE"},"\\n",{"children":[],"widgetConstructor":"docs-codesandbox","properties":{"url":"https://codesandbox.io/embed/github/dojo/examples/tree/master/todo-mvc","key":"compiled-7"},"type":"__WNODE_TYPE"}],"properties":{"key":"compiled-8"},"type":"__VNODE_TYPE"}';

describe('content compiler', () => {
	let sandbox: sinon.SinonSandbox;

	beforeEach(() => {
		sandbox = sinon.sandbox.create();

		mockery.enable({ warnOnUnregistered: false, useCleanCache: true });
	});

	afterEach(() => {
		sandbox.restore();
		mockery.deregisterAll();
		mockery.resetCache();
		mockery.disable();
	});

	it('should compile manifest files', () => {
		mockery.registerMock('../content/manifest.json', manifestJson);
		
		const blogSourcePath = '/src/generated/blog/2018/10/15/2018-10-15-Version-4-Dojo.md';
		const blogOutputPath= '/content/blog/2018/10/15/2018-10-15-Version-4-Dojo.ts';
		const atomXmlOutputPath = '/src/generated/assets/atom.xml';
		const tutorialSourcePath = '/content/tutorials/another-tutorial.md';
		const tutorialOutputPath = '/src/generated/tutorials/another-tutorial.ts';
		const tutorialListOutputPath = '/src/generated/list.ts';
		
		const resolveStub = sandbox.stub();
		resolveStub.onCall(0).returns(blogSourcePath);
		resolveStub.onCall(1).returns(blogOutputPath);
		resolveStub.onCall(2).returns(atomXmlOutputPath);
		resolveStub.onCall(3).returns(tutorialSourcePath);
		resolveStub.onCall(4).returns(tutorialOutputPath);
		resolveStub.onCall(5).returns(tutorialListOutputPath);
		
		const parseStub = sandbox.stub();
		parseStub.onFirstCall().returns({
			name: 'another-tutorial'
		});

		mockery.registerMock('path', {
			resolve: resolveStub,
			parse: parseStub,
			parsePath: parseStub
		});

		const readFileSyncStub = sandbox.stub();
		readFileSyncStub.onFirstCall().returns(blogMarkupContent);
		readFileSyncStub.onSecondCall().returns(markupContent);
		const outputFileSyncStub = sandbox.stub();
		mockery.registerMock('fs-extra', {
			readFileSync: readFileSyncStub,
			outputFileSync: outputFileSyncStub
		});

		const infoStub = sandbox.stub();
		mockery.registerMock('./logger', {
			info: infoStub
		});

		const compiler = require(COMPILE_SCRIPT_PATH);

		const registerHandlersStub = sandbox.stub(compiler, 'registerHandlers');
		registerHandlersStub.returns(handlersOutput);

		const getHyperscriptStub = sandbox.stub(compiler, 'getHyperscript');
		getHyperscriptStub.onCall(0).returns(getBlogHyperscriptOutput);
		getHyperscriptStub.onCall(1).returns(getTutorialHyperscriptOutput);

		const now = new Date();
		const isoTime = now.toISOString();
		const nowTime = now.getTime();
		const clock = sinon.useFakeTimers(nowTime);

		compiler.process();

		assert.equal(resolveStub.callCount, 6);

		assert.equal(readFileSyncStub.callCount, 2);

		assert.deepEqual(readFileSyncStub.getCall(0).args, [blogSourcePath, 'utf-8']);
		assert.deepEqual(readFileSyncStub.getCall(1).args, [tutorialSourcePath, 'utf-8']);

		assert.equal(outputFileSyncStub.callCount, 4);
		assert.deepEqual(outputFileSyncStub.getCall(0).args, [
			blogOutputPath,
			`export default ${JSON.stringify(getBlogHyperscriptOutput)};`
		]);

		const startAtomXmlOuput = `<?xml version="1.0" encoding="utf-8"?>\n<feed xmlns="http://www.w3.org/2005/Atom">\n    <id>http://dojo.io/blog</id>\n    <title>Dojo</title>\n    <updated>${isoTime}</updated>\n    <generator>https://github.com/jpmonette/feed</generator>\n    <author>\n        <name>SitePen</name>\n    </author>\n    <link rel="alternate" href="http://dojo.io/blog"/>\n    <link rel="self" href="https://dojo.io/atom"/>\n    <subtitle>The official blog of the Dojo framework</subtitle>\n    <icon>https://dojo.io/favicon.ico</icon>\n    <rights>All rights reserved 2018, SitePen</rights>\n    <entry>\n        <title type="html"><![CDATA[A example blog post]]></title>\n        <id>https://dojo.io/./blog/2018/10/15/2018-10-15-Version-4-Dojo.md</id>\n        <link href="https://dojo.io/./blog/2018/10/15/2018-10-15-Version-4-Dojo.md">\n        </link>\n        <updated>2018-10-15T12:00:00.000Z</updated>\n        <summary type="html"><![CDATA[A description of the post]]></summary>\n        <content type="html"><![CDATA[<h2>A test blog post</h2>\n<p>Some content</p>\n<!-- more -->\n<h2>Another heading</h2>\n]]></content>\n    </entry>\n</feed>`
		assert.equal(outputFileSyncStub.getCall(1).args[0], atomXmlOutputPath);
		assert.equal(outputFileSyncStub.getCall(1).args[1], startAtomXmlOuput);

		assert.deepEqual(outputFileSyncStub.getCall(2).args, [
			tutorialOutputPath,
			`export default ${JSON.stringify(getTutorialHyperscriptOutput)};`
		]);

		assert.deepEqual(outputFileSyncStub.getCall(3).args, [
			tutorialListOutputPath,
			listOutput
		]);

		assert.equal(infoStub.callCount, 4);
		assert.deepEqual(infoStub.getCall(0).args, [`${chalk.magenta.bold(' generated ')} ${blogOutputPath}`]);
		assert.deepEqual(infoStub.getCall(1).args, [`${chalk.magenta.bold(' generated ')} ${atomXmlOutputPath}`]);
		assert.deepEqual(infoStub.getCall(2).args, [`${chalk.magenta.bold(' generated ')} ${tutorialOutputPath}`]);
		assert.deepEqual(infoStub.getCall(3).args, [`${chalk.magenta.bold(' generated ')} ${tutorialListOutputPath}`]);

		assert.equal(registerHandlersStub.callCount, 1);

		assert.equal(getHyperscriptStub.callCount, 2);
		assert.deepEqual(getHyperscriptStub.getCall(0).args[0], blogMarkupContent);
		assert.deepEqual(getHyperscriptStub.getCall(0).args[1], handlersOutput);
		assert.deepEqual(getHyperscriptStub.getCall(1).args[0], markupContent);
		assert.deepEqual(getHyperscriptStub.getCall(1).args[1], handlersOutput);

		clock.restore();
	});

	it('should register handers', () => {
		const addMacroStub = sandbox.stub();
		mockery.registerMock('remark-macro', () => {
			return {
				addMacro: addMacroStub
			};
		});

		const compiler = require(COMPILE_SCRIPT_PATH);
		const registeredHandlers = compiler.registerHandlers(compiler.handlers);

		assert.equal(addMacroStub.callCount, 6);

		assert.equal(addMacroStub.firstCall.args.length, 2);
		assert.equal(addMacroStub.firstCall.args[0], 'Aside');
		assert.equal(typeof addMacroStub.firstCall.args[1], 'function');

		assert.equal(addMacroStub.getCall(5).args.length, 3);
		assert.equal(addMacroStub.getCall(5).args[0], 'Metadata');
		assert.equal(typeof addMacroStub.getCall(5).args[1], 'function');
		assert.equal(addMacroStub.getCall(5).args[2], true);

		assert.deepEqual(Object.keys(registeredHandlers), Object.keys(handlersOutput));
	});

	it('should build a vnode', () => {
		const tag = 'div';
		const props = { class: 'some-class' };

		const compiler = require(COMPILE_SCRIPT_PATH);
		const vnode = compiler.pragma(tag, props, ['text']);

		assert.deepEqual(
			JSON.stringify(vnode),
			JSON.stringify({
				tag: 'div',
				originalProperties: {},
				children: ['text'],
				properties: { class: 'some-class', key: 'compiled-0' },
				type: '__VNODE_TYPE'
			})
		);
	});

	it('should build a wnode', () => {
		const tag = 'Aside';
		const props: any = { title: 'some title' };

		const compiler = require(COMPILE_SCRIPT_PATH);
		const wnode = compiler.pragma(tag, props, ['text']);

		assert.deepEqual(
			JSON.stringify(wnode),
			JSON.stringify({
				children: ['text'],
				widgetConstructor: 'docs-aside',
				properties: { title: 'some title', key: 'compiled-0' },
				type: '__WNODE_TYPE'
			})
		);
	});

	it('should build a docs-codeblock widget', () => {
		const tag = 'CodeBlock';
		const props: any = { path: 'path/to/file', region: 'RegionName', language: 'tsx' };
		const fromHtmlOuput = 'Dummy output';
		const expectedOutput = w('docs-codeblock', props, [fromHtmlOuput]);

		const regionBuilderStub = sandbox.stub();
		regionBuilderStub.returns(expectedOutput);
		mockery.registerMock('./regions/parser', {
			regionBuilder: regionBuilderStub
		});

		const compiler = require(COMPILE_SCRIPT_PATH);
		const wnode = compiler.pragma(tag, props, []);

		assert.deepEqual(wnode.widgetConstructor, 'docs-codeblock');
		assert.deepEqual(wnode, expectedOutput);
	});

	it('should generate vnode/wnode syntax from markdown', () => {
		const compiler = require(COMPILE_SCRIPT_PATH);

		const registeredHandlers = compiler.registerHandlers(compiler.handlers);
		const nodes = compiler.getHyperscript(markupContent, registeredHandlers);

		assert.equal(JSON.stringify(nodes), getTutorialHyperscriptOutput);
	});

	it('should generate HTML from markdown', () => {
		const compiler = require(COMPILE_SCRIPT_PATH);
		const blogHtml = compiler.getHtml(blogMarkupContent);

		assert.equal(blogHtml, '<h2>A test blog post</h2>\n<p>Some content</p>\n<!-- more -->\n<h2>Another heading</h2>\n');

		const tutorialHtml = compiler.getHtml(markupContent);
		assert.equal(tutorialHtml, '<h1>Another Tutorial</h1>\n<h2>Aside</h2>\n<p>[Aside title="Another tutorial"]\nI am another tutorial\n[/Aside]</p>\n<h2>CodeSandbox Embed</h2>\n<p>[CodeSandbox url=https://codesandbox.io/embed/github/dojo/examples/tree/master/todo-mvc]</p>\n');
	});

	it('should generate object from frontmatter YAML', () => {

		const compiler = require(COMPILE_SCRIPT_PATH);
		const frontmatter = compiler.getFrontmatterYaml(blogMarkupContent);

		assert.equal(frontmatter.title, "A example blog post");
		assert.equal(frontmatter.author, "someone");
		assert.equal(frontmatter.description, "A description of the post");
		assert.equal(frontmatter.imageUrl, "some/image/path.jpg");
		assert.equal(frontmatter.date, new Date("2018-10-15T12:00:00.000Z").toString());
		
	});

});
