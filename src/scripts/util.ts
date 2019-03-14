export type HastNode = ElementNode | TextNode;

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

export function isElementNode(child: HastNode): child is ElementNode {
	return Boolean(child.type === 'element');
}

export function isTextNode(child: HastNode): child is TextNode {
	return Boolean(child.type === 'text');
}
