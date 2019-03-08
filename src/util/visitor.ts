import { DNode } from '@dojo/framework/widget-core/interfaces';
import { isVNode, isWNode } from '@dojo/framework/widget-core/d';

export type VisitorFunction = (node: DNode) => DNode | DNode[];

function visitChildren(node: DNode, visitor: VisitorFunction) {
	if (isVNode(node) || isWNode(node)) {
		node.children = visit(node.children, visitor);
	}
	return node;
}

function visit(nodes: DNode | DNode[], visitor: VisitorFunction) {
	if (!nodes) {
		return;
	}

	if (!Array.isArray(nodes)) {
		nodes = [nodes];
	}

	let finalNodes: DNode[] = [];
	for (let node of nodes) {
		if (!node) {
			continue;
		}

		let result = visitor(node);
		if (!result) {
			result = node;
		}

		if (Array.isArray(result)) {
			result = result.reduce<DNode[]>((results, resultNode) => {
				let innerResult = visit(resultNode, visitor);
				if (innerResult) {
					results.push(...innerResult);
				}
				return results;
			}, []);

			finalNodes.push(...result);
		} else {
			finalNodes.push(visitChildren(result, visitor));
		}
	}
	return finalNodes;
}

export default function(nodes: DNode | DNode[], visitor: VisitorFunction) {
	const final = visit(nodes, visitor);
	return final;
}
