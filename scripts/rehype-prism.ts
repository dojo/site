const visit = require('unist-util-visit');
const nodeToString = require('hast-util-to-string');
const refractor = require('refractor');

interface RehypePrismOptions {
	ignoreMissing?: boolean;
	extraLanguages?: string[];
}

export function rehypePrism(options?: RehypePrismOptions) {
	options = options || {};

	const { ignoreMissing = false, extraLanguages = [] } = options;

	extraLanguages.forEach((language) => refractor.register(require(`refractor/lang/${language}.js`)));

	return (tree: any) => visit(tree, 'element', visitor);

	function visitor(node: any, _index: number, parent: any) {
		if (!parent || parent.tagName !== 'pre' || node.tagName !== 'code') {
			return;
		}

		const lang = getLanguage(node);

		if (lang === null) {
			return;
		}

		let result;
		try {
			parent.properties.className = (parent.properties.className || []).concat('language-' + lang);
			result = refractor.highlight(nodeToString(node), lang);
		} catch (err) {
			if (ignoreMissing && /Unknown language/.test(err.message)) {
				return;
			}
			throw err;
		}

		node.children = result;
	}
}

function getLanguage(node: any) {
	const className = node.properties.className || [];

	for (const classListItem of className) {
		if (classListItem.slice(0, 9) === 'language-') {
			return classListItem.slice(9);
		}
	}

	return null;
}
