import { DefaultWidgetBaseInterface, DNode } from '@dojo/framework/widget-core/interfaces';
import { w } from '@dojo/framework/widget-core/d';
import * as mockery from 'mockery';
import * as sinon from 'sinon';

import { leftAlign, stripRegionComments } from '../../../../scripts/regions/parser';
import { INLINE_C_MATCHER } from '../../../../scripts/regions/region-matchers/inline-c';

const { describe, it, beforeEach, afterEach } = intern.getInterface('bdd');
const { assert } = intern.getPlugin('chai');

export const REGION_NAME = 'RegionName';

const parserPath = '../../../../scripts/regions/parser';

const regionContents = `	protected render() {
		// @start-region renderReturn
		return (<div></div>);
		// @end-region renderReturn
	}`;

const regionContentsCommentsStripped = `	protected render() {
		return (<div></div>);
	}`;

const regionContentsLeftAlligned = `protected render() {
	return (<div></div>);
}`;

const fromHtmlInput = `<pre><code class="language-tsx">${regionContentsLeftAlligned}</pre></code>`;
export const FROM_HTML_OUTPUT: DNode<DefaultWidgetBaseInterface> = {
	tag: 'pre',
	originalProperties: {},
	children: [
		{
			tag: 'code',
			originalProperties: {},
			children: [
				{
					tag: 'span',
					originalProperties: {},
					children: ['protected'],
					properties: { class: 'token keyword', key: 'compiled-2' },
					type: '__VNODE_TYPE'
				},
				' ',
				{
					tag: 'span',
					originalProperties: {},
					children: ['render'],
					properties: { class: 'token function', key: 'compiled-3' },
					type: '__VNODE_TYPE'
				},
				{
					tag: 'span',
					originalProperties: {},
					children: ['('],
					properties: { class: 'token punctuation', key: 'compiled-4' },
					type: '__VNODE_TYPE'
				},
				{
					tag: 'span',
					originalProperties: {},
					children: [')'],
					properties: { class: 'token punctuation', key: 'compiled-5' },
					type: '__VNODE_TYPE'
				},
				' ',
				{
					tag: 'span',
					originalProperties: {},
					children: ['{'],
					properties: { class: 'token punctuation', key: 'compiled-6' },
					type: '__VNODE_TYPE'
				},
				'\n\t',
				{
					tag: 'span',
					originalProperties: {},
					children: ['return'],
					properties: { class: 'token keyword', key: 'compiled-7' },
					type: '__VNODE_TYPE'
				},
				' ',
				{
					tag: 'span',
					originalProperties: {},
					children: ['('],
					properties: { class: 'token punctuation', key: 'compiled-8' },
					type: '__VNODE_TYPE'
				},
				{
					tag: 'span',
					originalProperties: {},
					children: [')'],
					properties: { class: 'token punctuation', key: 'compiled-9' },
					type: '__VNODE_TYPE'
				},
				{
					tag: 'span',
					originalProperties: {},
					children: [';'],
					properties: { class: 'token punctuation', key: 'compiled-10' },
					type: '__VNODE_TYPE'
				},
				'\n',
				{
					tag: 'span',
					originalProperties: {},
					children: ['}'],
					properties: { class: 'token punctuation', key: 'compiled-11' },
					type: '__VNODE_TYPE'
				}
			],
			properties: { class: 'language-tsx', key: 'compiled-12' },
			type: '__VNODE_TYPE'
		}
	],
	properties: { class: 'language-tsx', key: 'compiled-13' },
	type: '__VNODE_TYPE'
};

const region = `	// @start-region RegionName
${regionContents}
	// @end-region RegionName`;

const fileContents = `import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';

export default class App extends WidgetBase {
${region}
}
`;

describe('region parser', () => {
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

	it('should extract region', () => {
		const resolveStub = sandbox.stub();
		resolveStub.onCall(0).returns('content/examples/path/to/file');
		mockery.registerMock('path', {
			resolve: resolveStub
		});

		const readFileSyncStub = sandbox.stub();
		readFileSyncStub.onCall(0).returns(fileContents);
		mockery.registerMock('fs-extra', {
			readFileSync: readFileSyncStub
		});

		const parser = require(parserPath);
		const lefAlignStub = sandbox.stub(parser, 'leftAlign');
		lefAlignStub.returns(regionContentsLeftAlligned.split('\n'));

		const fromHtmlStub = sandbox.stub(parser, 'fromHtml');
		fromHtmlStub.returns(FROM_HTML_OUTPUT);

		const stripRegionCommentsStub = sandbox.stub(parser, 'stripRegionComments');
		stripRegionCommentsStub.returns(regionContentsCommentsStripped.split('\n'));

		const type = 'docs-codeblock';
		const props: any = { path: 'path/to/file', region: REGION_NAME, language: 'tsx' };
		const regionBuilderOutput = parser.regionBuilder(type, props, []);
		const regionMatcher = INLINE_C_MATCHER(REGION_NAME);

		assert.equal(stripRegionCommentsStub.callCount, 1);
		assert.deepEqual(stripRegionCommentsStub.firstCall.args, [regionContents.split('\n'), regionMatcher]);

		assert.equal(lefAlignStub.callCount, 1);
		assert.deepEqual(lefAlignStub.firstCall.args, [regionContentsCommentsStripped.split('\n')]);

		assert.equal(fromHtmlStub.callCount, 1);
		assert.deepEqual(fromHtmlStub.firstCall.args, [fromHtmlInput]);

		assert.deepEqual(regionBuilderOutput, w(type, props, [FROM_HTML_OUTPUT]));
	});

	it('should left strip region comments from output', () => {
		const regionMatcher = INLINE_C_MATCHER(REGION_NAME);
		const output = stripRegionComments(regionContents.split('\n'), regionMatcher);

		assert.deepEqual(output, regionContentsCommentsStripped.split('\n'));
	});

	it('should left align region', () => {
		const output = leftAlign(regionContentsCommentsStripped.split('\n'));

		assert.deepEqual(output, regionContentsLeftAlligned.split('\n'));
	});

	it('should convert from html to vnode syntax', () => {
		const parser = require(parserPath);
		const output = parser.fromHtml(fromHtmlInput);

		assert.equal(JSON.stringify(output), JSON.stringify(FROM_HTML_OUTPUT));
	});
});
