import { ElementNode, isTextNode } from './util';

import { visitor } from './link-cleanup';

function copy(node: ElementNode) {
	return {
		...node,
		children: node.children.map((child) => ({ ...child }))
	};
}

describe('link cleanup', () => {
	it('should ignore none link nodes', () => {
		const nonLinkNode: ElementNode = {
			type: 'element',
			tagName: 'p',
			properties: {},
			children: [
				{
					type: 'text',
					value: 'https://github.com/dojo/framework/pull/1'
				}
			]
		};

		const copiedNode = copy(nonLinkNode);
		visitor(copiedNode);

		expect(copiedNode).toEqual(nonLinkNode);
	});

	it('external link should add target', () => {
		const externalLinkNode: ElementNode = {
			type: 'element',
			tagName: 'a',
			properties: {
				href: 'http://example.com'
			},
			children: [
				{
					type: 'text',
					value: 'Example Site'
				}
			]
		};

		visitor(externalLinkNode);

		expect(externalLinkNode.properties).toEqual({
			href: 'http://example.com',
			target: '_blank'
		});
	});

	it('relative links should be stripped of file extensions and hashes', () => {
		const relativeLinkNode: ElementNode = {
			type: 'element',
			tagName: 'a',
			properties: {
				href: './introduction.md#basics'
			},
			children: [
				{
					type: 'text',
					value: 'Basics'
				}
			]
		};

		visitor(relativeLinkNode);

		expect(relativeLinkNode.properties).toEqual({
			href: './introduction'
		});
	});

	describe('github link cleanup', () => {
		it('should cleanup github URLs', () => {
			const githubUrlNode: ElementNode = {
				type: 'element',
				tagName: 'a',
				properties: { href: 'https://github.com/dojo/framework/pull/1' },
				children: [
					{
						type: 'text',
						value: 'https://github.com/dojo/framework/pull/1'
					}
				]
			};

			visitor(githubUrlNode);

			expect(githubUrlNode.properties).toEqual({
				href: 'https://github.com/dojo/framework/pull/1',
				target: '_blank'
			});
			expect(githubUrlNode.children).toHaveLength(1);

			const child = githubUrlNode.children[0];
			expect(isTextNode(child)).toBeTruthy();
			if (isTextNode(child)) {
				expect(child.value).toBe('#1');
			}
		});

		it('should not cleanup github URLs with multiple children', () => {
			const multiChildrenNode: ElementNode = {
				type: 'element',
				tagName: 'a',
				properties: { href: 'https://github.com/dojo/framework/pull/1' },
				children: [
					{
						type: 'element',
						tagName: 'i',
						properties: { class: 'icon icon-cog' },
						children: []
					},
					{
						type: 'text',
						value: 'https://github.com/dojo/framework/pull/1'
					}
				]
			};

			const copiedNode = copy(multiChildrenNode);
			visitor(copiedNode);

			expect(copiedNode).toEqual(multiChildrenNode);
		});

		it('should not cleanup github URLs with a non-text child', () => {
			const nonTextChildNode: ElementNode = {
				type: 'element',
				tagName: 'a',
				properties: { href: 'https://github.com/dojo/framework/pull/1' },
				children: [
					{
						type: 'element',
						tagName: 'i',
						properties: { class: 'icon icon-cog' },
						children: []
					}
				]
			};

			const copiedNode = copy(nonTextChildNode);
			visitor(nonTextChildNode);

			expect(copiedNode).toEqual(nonTextChildNode);
		});
	});
});
