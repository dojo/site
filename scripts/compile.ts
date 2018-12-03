import { v, w } from '@dojo/framework/widget-core/d';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { readFileSync, outputFileSync } from 'fs-extra';
import { resolve, parse as parsePath } from 'path';
import chalk from 'chalk';

import { info } from './logger';
import { regionBuilder } from './regions/parser';
import { Feed } from "feed";

const manifest = require('../content/manifest.json');
const unified = require('unified');
const parse = require('remark-parse');
const toH = require('hast-to-hyperscript');
const remark2rehype = require('remark-rehype');
const rehypePrism = require('@mapbox/rehype-prism');
const macro = require('remark-macro')();
const all = require('mdast-util-to-hast/lib/all');
const frontmatter = require('remark-frontmatter');
const parseFrontmatter = require('remark-parse-yaml');
const html = require('remark-html')

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

const feed = new Feed({
	title: "Dojo",
	description: "This is my personal feed!",
	id: "http://dojo.io/blog",
	link: "http://dojo.io/blog",
	// image: "http://example.com/image.png",
	favicon: "https://dojo.io/favicon.ico",
	copyright: "All rights reserved 2018, SitePen",
	// generator: "awesome", // optional, default = 'Feed for Node.js'
	feedLinks: {
		json: "https://dojo.io/json",
		atom: "https://dojo.io/atom"
	},
	author: {
		name: "SitePen"
	},
	feed: '' // Required but not sure what it does?
});


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

export const getHtml = (content: string) => {
	const parsedHtml = unified()
		.use(parse)	
		.use(frontmatter, ['yaml'])
		.use(html)
		.processSync(content);
	return String(parsedHtml);
}

export const getFrontmatterYaml = (content: string) => {
	const pipeline = unified()
		.use(parse)
		.use(frontmatter, ['yaml'])
		.use(parseFrontmatter)
	const nodes = pipeline.parse(content);
	const result = pipeline.runSync(nodes);
	return result.children[0].data.parsedValue;
}

export const getHyperscript = (content: string, registeredHandlers: { [type: string]: HandlerFunction }) => {
	const pipeline = unified()
		.use(parse)
		.use(macro.transformer)
		.use(remark2rehype, { handlers: registeredHandlers })
		.use(rehypePrism, { ignoreMissing: false })
	const nodes = pipeline.parse(content);
	const result = pipeline.runSync(nodes);
	return toH(pragma, result)
}

export function process() {
	const registeredHandlers = registerHandlers(handlers);

	manifest.blog.map(({ path }: { path: string }) => {
		const outputPath = path.replace(/\.md$/, '.ts');
		const fullPath = resolve(__dirname, '../', 'content', path);

		const content = readFileSync(fullPath, 'utf-8');
		const { title, date, author } = getFrontmatterYaml(content);
		const itemContent = getHtml(content);
		const nodes = getHyperscript(content, registeredHandlers);
		const url = "https://dojo.io/" + path;

		feed.addItem({
			title: title,
			id: url,
			author: author,
			link: url,
			description: '', // TODO: Create description
			content: itemContent,
			date: date
		});

		const generatedPath = resolve('src', 'generated', outputPath);
		outputFileSync(generatedPath, `export default ${JSON.stringify(nodes)};`);
		info(`${chalk.magenta.bold(' generated ')} ${generatedPath}`);
	});

	const atomFeed = feed.atom1();
	const atomFeedPath = resolve('src', 'generated', 'assets', 'atom.xml');
	outputFileSync(atomFeedPath, atomFeed);
	info(`${chalk.magenta.bold(' generated ')} ${atomFeedPath}`);
	

	manifest.tutorials.map(({ path }: { path: string }) => {
		const outputPath = path.replace(/\.md$/, '.ts');
		path = resolve(__dirname, '../', 'content', path);
		const content = readFileSync(path, 'utf-8');
		const nodes = getHyperscript(content, registeredHandlers);

		const generatedPath = resolve('src', 'generated', outputPath);
		outputFileSync(generatedPath, `export default ${JSON.stringify(nodes)};`);
		info(`${chalk.magenta.bold(' generated ')} ${generatedPath}`);
	});

	const paths = manifest.tutorials.map(({ name, path }: { name: string; path: string }) => ({
		name,
		path: parsePath(path).name
	}));
	const listPath = resolve('src', 'generated', 'list.ts');
	outputFileSync(listPath, `export default ${JSON.stringify(paths)};`);
	info(`${chalk.magenta.bold(' generated ')} ${listPath}`);
}
