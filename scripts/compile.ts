import { v, w } from '@dojo/framework/widget-core/d';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { readFileSync, outputFileSync, removeSync, existsSync } from 'fs-extra';
import { resolve, parse as parsePath, join } from 'path';
import chalk from 'chalk';

import { info } from './logger';
import { regionBuilder } from './regions/parser';

const unified = require('unified');
const parse = require('remark-parse');
const toH = require('hast-to-hyperscript');
const remark2rehype = require('remark-rehype');
const rehypePrism = require('@mapbox/rehype-prism');
const macro = require('remark-macro')();
const all = require('mdast-util-to-hast/lib/all');

export interface ManifestConfigFile {
	name: string;
	path: string;
}

export interface ManifestConfig {
	[section: string]: ManifestConfigFile[];
}

export interface BuildDetails {
	[section: string]: {
		[filePath: string]: string;
	};
}

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
let buildDetails: BuildDetails = {};
let currentSection: string;
let currentParent: string;

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

export const fromMarkdown = (content: string, registeredHandlers: { [type: string]: HandlerFunction }) => {
	const pipeline = unified()
		.use(parse)
		.use(macro.transformer)
		.use(remark2rehype, { handlers: registeredHandlers })
		.use(rehypePrism, { ignoreMissing: false });

	const nodes = pipeline.parse(content);
	const result = pipeline.runSync(nodes);
	return toH(pragma, result);
};

export const registerFileWithBuild = (path: string) => {
	if (buildDetails[currentSection] === undefined) {
		buildDetails[currentSection] = {};
	}

	buildDetails[currentSection][path] = currentParent;
};

export function process(event?: string, filePath?: string) {
	const manifestPath = resolve('content', 'manifest.json');
	const buildDetailsPath = resolve('assets', 'generated', 'build.json');

	let buildAll = true;
	if (event !== undefined && filePath !== undefined) {
		filePath = resolve(filePath);
		if (filePath !== manifestPath && existsSync(buildDetailsPath)) {
			buildAll = false;

			buildDetails = require(buildDetailsPath);
		}
	}

	const registeredHandlers = registerHandlers(handlers);
	const manifest: ManifestConfig = require(manifestPath);

	for (let section in manifest) {
		processSection(section, manifest, registeredHandlers, buildAll ? undefined : filePath);
	}

	outputFileSync(buildDetailsPath, JSON.stringify(buildDetails, null, 2));
	info(`${chalk.blue.bold(' build details ')} ${buildDetailsPath}`);
}

export const processSection = (
	section: string,
	manifest: ManifestConfig,
	registeredHandlers: { [type: string]: HandlerFunction },
	filePath?: string
) => {
	currentSection = section;

	console.log(`hello? ${section}`);

	if (filePath !== undefined) {
		// Build part
		let partToBuild: string | undefined;
		if (buildDetails[section] !== undefined && buildDetails[section][filePath] !== undefined) {
			partToBuild = buildDetails[section][filePath];
		}

		const part = manifest[section].find((file) => file.path === partToBuild);
		if (part !== undefined) {
			info(`${chalk.yellow.bold(' processing ')} ${section}...`);
			processMarkdown(part.path, registeredHandlers);
		}
	} else {
		// Build All
		info(`${chalk.yellow.bold(' processing ')} ${section}...`);
		removeSync(join(__dirname, 'assets/generated'));
		manifest[section].map(({ path }: { path: string }) => processMarkdown(path, registeredHandlers));
		buildSectionList(manifest, section);
	}
};

export const processMarkdown = (path: string, registeredHandlers: { [type: string]: HandlerFunction }): void => {
	currentParent = path;

	const outputPath = path.replace(/\.md$/, '.ts');
	path = resolve(__dirname, '../', 'content', path);
	const content = readFileSync(path, 'utf-8');

	const nodes = fromMarkdown(content, registeredHandlers);

	const generatedPath = resolve('assets', 'generated', outputPath);
	outputFileSync(generatedPath, `export default ${JSON.stringify(nodes)};`);
	info(`${chalk.magenta.bold(' generated ')} ${generatedPath}`);
};

export const buildSectionList = (manifest: ManifestConfig, section: string): void => {
	let paths: ManifestConfigFile[] = [];
	paths = manifest[section].map(({ name, path }: { name: string; path: string }) => ({
		name,
		path: parsePath(path).name
	}));
	const listPath = resolve('assets', 'generated', `${section}-list.ts`);
	outputFileSync(listPath, `export default ${JSON.stringify(paths)};`);
	info(`${chalk.magenta.bold(' generated ')} ${listPath}`);
};
