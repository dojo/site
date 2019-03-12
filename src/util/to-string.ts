import { DNode } from '@dojo/framework/widget-core/interfaces';
import { isVNode, isWNode } from '@dojo/framework/widget-core/d';

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
