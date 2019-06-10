export type HastNode = ElementNode | TextNode | YamlNode;

export interface RootNode {
	type: 'root';
	children: HastNode[];
}

export interface ElementNode {
	type: 'element';
	tagName: string;
	properties: { [key: string]: string };
	children: HastNode[];
}

export interface TextNode {
	type: 'text';
	value: string;
}

export type YamlData = { [key: string]: YamlData } | string | boolean | Date;

export interface YamlNode {
	type: 'yaml';
	value: string;
	data: {
		parsedValue: { [key: string]: YamlData };
	};
}

export function isElementNode(child: HastNode): child is ElementNode {
	return Boolean(child.type === 'element');
}

export function isTextNode(child: HastNode): child is TextNode {
	return Boolean(child.type === 'text');
}

export function isYamlNode(child: HastNode): child is YamlNode {
	return Boolean(child.type === 'yaml');
}
