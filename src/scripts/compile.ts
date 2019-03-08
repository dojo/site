import { v, w } from '@dojo/framework/widget-core/d';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { readFile } from 'fs-extra';
import { resolve } from 'path';

import { regionBuilder } from './regions/parser';

import linkCleanup from './link-cleanup';

const unified = require('unified');
const macro = require('remark-macro')();
const remarkParse = require('remark-parse');
const toH = require('hast-to-hyperscript');
const remark2rehype = require('remark-rehype');
const rehypePrism = require('@mapbox/rehype-prism');
const all = require('mdast-util-to-hast/lib/all');

export interface Handler {
	type: string;
	inline?: boolean;
}

export type HandlerFunction = (h: Function, node: any) => any;

export interface WidgetBuilders {
	[type: string]: WidgetBuilder;
}

export type WidgetBuilder = (type: string, props: any, children: any[]) => DNode;

export const handlers: Handler[] = [
	{ type: 'Alert' },
	{ type: 'Aside' },
	{ type: 'CodeBlock', inline: true },
	{ type: 'CodeSandbox', inline: true }
];

export const widgets: WidgetBuilders = {
	'docs-codeblock': regionBuilder
};

let key = 0;

export const pragma = (tag: string, props: any = {}, children: any[]) => {
	props.key = `compiled-${key++}`;
	if (tag.substr(0, 1) === tag.substr(0, 1).toUpperCase()) {
		const type = `docs-${tag.toLowerCase()}`;
		if (widgets[type]) {
			return widgets[type](type, props, children);
		}
		return w(type, props, children);
	}
	return v(tag, props, children);
};

export const registerHandlers = (types: Handler[]): { [type: string]: HandlerFunction } => {
	return types.reduce((handlers: { [type: string]: HandlerFunction }, { type, inline = false }) => {
		try {
			if (inline) {
				macro.addMacro(type, (props: any) => ({ type, props }), true);
			} else {
				macro.addMacro(
					type,
					(content: string, props: any, { transformer, eat }: { transformer: any; eat: any }) => {
						return { type, props, children: transformer.tokenizeBlock(content, eat.now()) };
					}
				);
			}
		} catch (err) {}

		if (inline) {
			handlers[type] = (h, node) => h(node, node.type, node.props);
		} else {
			handlers[type] = (h, node) => h(node, node.type, node.props, all(h, node));
		}
		return handlers;
	}, {});
};

export const fromMarkdown = (
	content: string,
	registeredHandlers: { [type: string]: HandlerFunction }
): DNode => {
	const pipeline = unified()
		.use(remarkParse, { commonmark: true })
		.use(macro.transformer)
		.use(remark2rehype, { handlers: registeredHandlers })
		.use(linkCleanup)
		.use(rehypePrism, { ignoreMissing: false });

	const nodes = pipeline.parse(content);
	const result = pipeline.runSync(nodes);
	const hNodes = toH(pragma, result);
	return hNodes;
};

export const getLocalFile = async (path: string): Promise<string> => {
	path = resolve(__dirname, path);
	return await readFile(path, 'utf-8');
};

export const setLocale = (path: string, locale: string) => {
	return path.replace(/:locale:/g, locale);
};
