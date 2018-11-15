import { DefaultWidgetBaseInterface, DNode } from '@dojo/framework/widget-core/interfaces';
import * as mockery from 'mockery';
import * as sinon from 'sinon';

import { leftAlign, stripRegionComments } from '../../regions/parser';
import { INLINE_C_MATCHER } from '../../regions/region-matchers/inline-c';
import { v } from '@dojo/framework/widget-core/d';

const { describe, it, beforeEach, afterEach } = intern.getInterface('bdd');
const { assert } = intern.getPlugin('chai');

export const regionName = 'RegionName';

const parserPath = '../../regions/parser';

const regionContents = `	protected render() {
		const div = <div>Test content</div>;

		// @start-region renderReturn
		return {div};
		// @end-region renderReturn
	}`;

const regionContentsCommentsStripped = `	protected render() {
		const div = <div>Test content</div>;

		return {div};
	}`;

const regionContentsLeftAlligned = `protected render() {
	const div = <div>Test content</div>;

	return {div};
}`;

export const fromMarkdownOutput: DNode<DefaultWidgetBaseInterface> = {
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
				'\n    ',
				{
					tag: 'span',
					originalProperties: {},
					children: ['const'],
					properties: { class: 'token keyword', key: 'compiled-7' },
					type: '__VNODE_TYPE'
				},
				' div ',
				{
					tag: 'span',
					originalProperties: {},
					children: ['='],
					properties: { class: 'token operator', key: 'compiled-8' },
					type: '__VNODE_TYPE'
				},
				' ',
				{
					tag: 'span',
					originalProperties: {},
					children: [
						{
							tag: 'span',
							originalProperties: {},
							children: [
								{
									tag: 'span',
									originalProperties: {},
									children: ['<'],
									properties: { class: 'token punctuation', key: 'compiled-9' },
									type: '__VNODE_TYPE'
								},
								'div'
							],
							properties: { class: 'token tag', key: 'compiled-10' },
							type: '__VNODE_TYPE'
						},
						{
							tag: 'span',
							originalProperties: {},
							children: ['>'],
							properties: { class: 'token punctuation', key: 'compiled-11' },
							type: '__VNODE_TYPE'
						}
					],
					properties: { class: 'token tag', key: 'compiled-12' },
					type: '__VNODE_TYPE'
				},
				{
					tag: 'span',
					originalProperties: {},
					children: ['Test content'],
					properties: { class: 'token plain-text', key: 'compiled-13' },
					type: '__VNODE_TYPE'
				},
				{
					tag: 'span',
					originalProperties: {},
					children: [
						{
							tag: 'span',
							originalProperties: {},
							children: [
								{
									tag: 'span',
									originalProperties: {},
									children: ['</'],
									properties: { class: 'token punctuation', key: 'compiled-14' },
									type: '__VNODE_TYPE'
								},
								'div'
							],
							properties: { class: 'token tag', key: 'compiled-15' },
							type: '__VNODE_TYPE'
						},
						{
							tag: 'span',
							originalProperties: {},
							children: ['>'],
							properties: { class: 'token punctuation', key: 'compiled-16' },
							type: '__VNODE_TYPE'
						}
					],
					properties: { class: 'token tag', key: 'compiled-17' },
					type: '__VNODE_TYPE'
				},
				{
					tag: 'span',
					originalProperties: {},
					children: [';'],
					properties: { class: 'token punctuation', key: 'compiled-18' },
					type: '__VNODE_TYPE'
				},
				'\n\n    ',
				{
					tag: 'span',
					originalProperties: {},
					children: ['return'],
					properties: { class: 'token keyword', key: 'compiled-19' },
					type: '__VNODE_TYPE'
				},
				' ',
				{
					tag: 'span',
					originalProperties: {},
					children: ['{'],
					properties: { class: 'token punctuation', key: 'compiled-20' },
					type: '__VNODE_TYPE'
				},
				'div',
				{
					tag: 'span',
					originalProperties: {},
					children: ['}'],
					properties: { class: 'token punctuation', key: 'compiled-21' },
					type: '__VNODE_TYPE'
				},
				{
					tag: 'span',
					originalProperties: {},
					children: [';'],
					properties: { class: 'token punctuation', key: 'compiled-22' },
					type: '__VNODE_TYPE'
				},
				'\n',
				{
					tag: 'span',
					originalProperties: {},
					children: ['}'],
					properties: { class: 'token punctuation', key: 'compiled-23' },
					type: '__VNODE_TYPE'
				},
				'\n'
			],
			properties: { class: 'language-tsx', key: 'compiled-24' },
			type: '__VNODE_TYPE'
		}
	],
	properties: { class: 'language-tsx', key: 'compiled-25' },
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

const fileContentsNoRegions = `import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';

export default class App extends WidgetBase {
${regionContentsLeftAlligned}
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
		resolveStub.returns('content/examples/path/to/file');
		mockery.registerMock('path', {
			resolve: resolveStub
		});

		const existsSyncStub = sandbox.stub();
		existsSyncStub.returns(true);

		const readFileSyncStub = sandbox.stub();
		readFileSyncStub.returns(fileContents);

		mockery.registerMock('fs-extra', {
			existsSync: existsSyncStub,
			readFileSync: readFileSyncStub
		});

		const wStub = sandbox.stub();
		mockery.registerMock('@dojo/framework/widget-core/d', {
			w: wStub,
			v: v
		});

		let parser = require(parserPath);
		const lefAlignStub = sandbox.stub(parser, 'leftAlign');
		lefAlignStub.returns(regionContentsLeftAlligned.split('\n'));

		const stripRegionCommentsStub = sandbox.stub(parser, 'stripRegionComments');
		stripRegionCommentsStub.returns(regionContentsCommentsStripped.split('\n'));

		const type = 'docs-codeblock';
		const props: any = { path: 'path/to/file' };
		const propsWithRegion: any = { ...props, region: regionName };
		const propsWithTS: any = { ...propsWithRegion, ...{ language: 'ts' } };
		const propsWithTSX: any = { ...propsWithRegion, ...{ language: 'tsx' } };
		const propsWithTSWithoutRegion: any = { ...props, ...{ region: undefined, language: 'ts' } };

		// Proper run with language provided
		parser.regionBuilder(type, propsWithTSX, []);

		assert.equal(stripRegionCommentsStub.callCount, 1);
		assert.deepEqual(stripRegionCommentsStub.firstCall.args, [
			regionContents.split('\n'),
			INLINE_C_MATCHER.regionCommentMatcher
		]);

		assert.equal(lefAlignStub.callCount, 1);
		assert.deepEqual(lefAlignStub.firstCall.args, [regionContentsCommentsStripped.split('\n')]);

		assert.equal(wStub.callCount, 1);
		assert.equal(wStub.firstCall.args[0], type);
		assert.deepEqual(wStub.firstCall.args[1], propsWithTSX);
		assert.equal(JSON.stringify(wStub.firstCall.args[2]), JSON.stringify([fromMarkdownOutput]));

		// Proper run without language provided
		parser.regionBuilder(type, propsWithRegion, []);
		assert.equal(wStub.callCount, 2);
		assert.deepEqual(wStub.secondCall.args[1], propsWithTS);

		// Proper run without region provided
		parser.regionBuilder(type, props, []);
		assert.equal(wStub.callCount, 3);
		assert.equal(JSON.stringify(wStub.thirdCall.args[1]), JSON.stringify(propsWithTSWithoutRegion));
	});

	it('should display error message when region or file is not found', () => {
		const resolveStub = sandbox.stub();
		resolveStub.onFirstCall().returns('content/examples/path/to/file');
		mockery.registerMock('path', {
			resolve: resolveStub
		});

		const existsSyncStub = sandbox.stub();
		existsSyncStub.returns(true);
		existsSyncStub.onSecondCall().returns(false);

		const readFileSyncStub = sandbox.stub();
		readFileSyncStub.onFirstCall().returns(fileContentsNoRegions);
		mockery.registerMock('fs-extra', {
			existsSync: existsSyncStub,
			readFileSync: readFileSyncStub
		});

		const vStub = sandbox.stub();
		mockery.registerMock('@dojo/framework/widget-core/d', {
			v: vStub
		});

		const parser = require(parserPath);

		const type = 'docs-codeblock';
		const props: any = { path: 'path/to/file', region: regionName, language: 'tsx' };

		parser.regionBuilder(type, props, []);
		assert.equal(existsSyncStub.callCount, 1);
		assert.equal(readFileSyncStub.callCount, 1);
		assert.equal(vStub.callCount, 1);
		assert.deepEqual(vStub.firstCall.args, ['p', ['Could not load region']]);

		parser.regionBuilder(type, props, []);
		assert.equal(existsSyncStub.callCount, 2);
		assert.equal(readFileSyncStub.callCount, 1);
		assert.equal(vStub.callCount, 2);
		assert.deepEqual(vStub.secondCall.args, ['p', ['Could not load file']]);

		parser.regionBuilder(type, {}, []);
		assert.equal(existsSyncStub.callCount, 2);
		assert.equal(readFileSyncStub.callCount, 1);
		assert.equal(vStub.callCount, 3);
		assert.deepEqual(vStub.thirdCall.args, ['p', ['Invalid file path']]);

		parser.regionBuilder(type, { ...props, ...{ language: 'dummy' } });
		assert.equal(existsSyncStub.callCount, 3);
		assert.equal(readFileSyncStub.callCount, 1);
		assert.equal(vStub.callCount, 4);
		assert.deepEqual(vStub.getCall(3).args, ['p', ['Could not recognize language']]);
	});

	it('should left strip region comments from output', () => {
		const output = stripRegionComments(regionContents.split('\n'), INLINE_C_MATCHER.regionCommentMatcher);

		assert.deepEqual(output, regionContentsCommentsStripped.split('\n'));
	});

	it('should left align region', () => {
		const output = leftAlign(regionContentsCommentsStripped.split('\n'));

		assert.deepEqual(output, regionContentsLeftAlligned.split('\n'));

		const output2 = leftAlign(regionContentsLeftAlligned.split('\n'));

		assert.deepEqual(output2, regionContentsLeftAlligned.split('\n'));
	});
});
