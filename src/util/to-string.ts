import { DNode } from '@dojo/framework/core/interfaces';
import { isVNode, isWNode } from '@dojo/framework/core/vdom';

export function toString(node: DNode): string {
	if (typeof node === 'string') {
		return node;
	}

	if (isVNode(node) || isWNode(node)) {
		if (node.children && node.children.length > 0) {
			return node.children.reduce<string>((value, childNode) => value + toString(childNode), '');
		}
	}

	return '';
}
