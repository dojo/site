import { v, w } from '@dojo/framework/core/vdom';
import { DNode } from '@dojo/framework/core/interfaces';

import { regionBuilder } from './regions/parser';

const unified = require('unified');
const macro = require('remark-macro')();
const remarkParse = require('remark-parse');
const toH = require('hast-to-hyperscript');
const remark2rehype = require('remark-rehype');
const rehypePrism = require('@mapbox/rehype-prism');
const all = require('mdast-util-to-hast/lib/all');
const frontmatter = require('remark-frontmatter');
const visit = require('unist-util-visit');
const stringify = require('rehype-stringify');
// const section = require('@agentofuser/rehype-section')
const section = require('remark-sectionize');

interface Handler {
	type: string;
	inline?: boolean;
}

type HandlerFunction = (h: Function, node: any) => any;

interface WidgetBuilders {
	[type: string]: () => WidgetBuilder;
}

type WidgetBuilder = (type: string, props: any, children: any[]) => DNode;

const handlers: Handler[] = [
	{ type: 'Alert' },
	{ type: 'Aside' },
	{ type: 'CodeBlock', inline: true },
	{ type: 'CodeSandbox', inline: true },
	{ type: 'BlogImage', inline: true }
];

const widgets: WidgetBuilders = {
	'docs-codeblock': () => regionBuilder
};

let key = 0;

const getCompiledKey = () => {
	return `compiled-${key++}`;
};

const pragma = (tag: string, props: any = {}, children: any[]) => {
	props.key = getCompiledKey();
	if (tag.substr(0, 1) === tag.substr(0, 1).toUpperCase()) {
		const type = `docs-${tag.toLowerCase()}`;
		if (widgets[type]) {
			return widgets[type]()(type, props, children);
		}
		return w(type, props, children);
	}
	return v(tag, props, children);
};

const registerHandlers = (types: Handler[]): { [type: string]: HandlerFunction } => {
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
const registeredHandlers = registerHandlers(handlers);

function clean(node: any) {
	if (!node || node.type !== 'element' || node.tagName !== 'a') {
		return;
	}
	const relativeMatch = /^(.\/[\s\S]*)([.][a-z]+)([#][\s\S]+)?$/g.exec(node.properties.href);
	if (relativeMatch && relativeMatch.length >= 3) {
		// Has a file extension
		let url = relativeMatch[1];
		node.properties.href = url;
	}
	const externalMatch = /^http[s]?:\/\/[\S]+$/g.exec(node.properties.href);
	if (externalMatch) {
		node.properties.target = '_blank';
	}
	// Make github links prettier
	if (node.children && node.children.length === 1) {
		const child = node.children[0];
		if (child.type === 'text') {
			const match = /http[s]?:\/\/github.com\/[^\/]+\/[^\/]+\/[^\/]+\/([0-9]+)/g.exec(child.value);
			if (match && match.length === 2) {
				child.value = `#${match[1]}`;
			}
		}
	}
}

export const markdown = (content: string, outputType: 'dnode' | 'string' = 'dnode'): DNode => {
	const pipeline = unified()
		.use(remarkParse, { commonmark: true })
		.use(frontmatter, 'yaml')
		.use(macro.transformer)
		.use(section)
		.use(remark2rehype, { handlers: registeredHandlers })
		.use(() => (tree: any) => visit(tree, 'element', clean))
		.use(rehypePrism, { ignoreMissing: false });

	const nodes = pipeline.parse(content);
	const result = pipeline.runSync(nodes);

	if (outputType === 'string') {
		const string: string = unified()
			.use(stringify)
			.stringify(result);

		return string;
	}

	key = 0;
	return toH(pragma, result);
};

export default markdown;
