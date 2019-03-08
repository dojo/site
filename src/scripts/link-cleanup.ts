import { HastNode, isElementNode } from './util';

const visit = require('unist-util-visit');

export default function() {
	return (tree: any) => {
		visit(tree, 'element', visitor);
	};

	function visitor(node: HastNode) {
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
	}
}
