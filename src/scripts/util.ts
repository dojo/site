export interface HastNode {
	type: 'element' | 'text';
}

export interface ElementNode extends HastNode {
	type: 'element';
	tagName: string;
	properties: { [key: string]: string };
	children: HastNode[];
}

export interface TextNode extends HastNode {
	type: 'text';
	value: string;
}

export function isElementNode(child: HastNode): child is ElementNode {
	return Boolean(child.type === 'element');
}
