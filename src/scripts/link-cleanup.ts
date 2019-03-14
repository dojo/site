import { HastNode, isElementNode, isTextNode } from './util';

const visit = require('unist-util-visit');

export function visitor(node: HastNode) {
	if (!node || !isElementNode(node) || node.tagName !== 'a') {
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
		if (isTextNode(child)) {
			const match = /http[s]?:\/\/github.com\/[^\/]+\/[^\/]+\/[^\/]+\/([0-9]+)/g.exec(child.value);
			if (match && match.length === 2) {
				child.value = `#${match[1]}`;
			}
		}
	}
}

export default function() {
	return (tree: any) => {
		visit(tree, 'element', visitor);
	};
}
