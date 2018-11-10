import { v, w } from '@dojo/framework/widget-core/d';
import { readFileSync, outputFileSync } from 'fs-extra';
import { resolve, parse as parsePath } from 'path';
import chalk from 'chalk';

import { info } from './logger';
import { Handler, WidgetBuilders, HandlerFunction } from './interface';
import { rehypePrism } from './rehype-prism';
import { regionBuilder } from './regions/parser';

const manifest = require('../content/manifest.json');
const unified = require('unified');
const parse = require('remark-parse');
const toH = require('hast-to-hyperscript');
const remark2rehype = require('remark-rehype');
const macro = require('remark-macro')();
const all = require('mdast-util-to-hast/lib/all');

export const handlers: Handler[] = [
	{ type: 'Aside' },
	{ type: 'Task' },
	{ type: 'Instruction' },
	{ type: 'CodeBlock', inline: true },
	{ type: 'CodeSandbox', inline: true },
	{ type: 'Metadata', inline: true }
];

const widgets: WidgetBuilders = {
	'docs-codeblock': regionBuilder
};

let key = 0;

export const pragma = (tag: string, props: any = {}, children: any[]) => {
	props.key = `compiled-${key}`;
	key++;
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
		if (inline) {
			macro.addMacro(type, (props: any) => ({ type, props }), true);
			handlers[type] = (h, node) => h(node, node.type, node.props);
		} else {
			macro.addMacro(
				type,
				(content: string, props: any, { transformer, eat }: { transformer: any; eat: any }) => {
					return { type, props, children: transformer.tokenizeBlock(content, eat.now()) };
				}
			);
			handlers[type] = (h, node) => h(node, node.type, node.props, all(h, node));
		}
		return handlers;
	}, {});
};

export const fromMarkdown = (content: string, registeredHandlers: { [type: string]: HandlerFunction }) => {
	const pipeline = unified()
		.use(parse)
		.use(macro.transformer)
		.use(remark2rehype, { handlers: registeredHandlers })
		.use(rehypePrism, { ignoreMissing: true, extraLanguages: ['tsx'] });

	const nodes = pipeline.parse(content);
	const result = pipeline.runSync(nodes);
	return toH(pragma, result);
};

export function process() {
	info();

	const registeredHandlers = registerHandlers(handlers);

	manifest.tutorials.map(({ path }: { path: string }) => {
		const outputPath = path.replace(/\.md$/, '.ts');
		path = resolve(__dirname, '../', 'content', path);
		const content = readFileSync(path, 'utf-8');
		const nodes = fromMarkdown(content, registeredHandlers);

		const generatedPath = resolve('src', 'generated', outputPath);
		info(`${chalk.magenta.bold(' generated ')} ${generatedPath}`);
		outputFileSync(generatedPath, `export default () => { return ${JSON.stringify(nodes)} }`);
	});

	const paths = manifest.tutorials.map(({ name, path }: { name: string; path: string }) => ({
		name,
		path: parsePath(path).name
	}));
	const listPath = resolve('src', 'generated', 'list.ts');
	info(`${chalk.magenta.bold(' generated ')} ${listPath}`);
	outputFileSync(listPath, `export default ${JSON.stringify(paths)};`);
}
