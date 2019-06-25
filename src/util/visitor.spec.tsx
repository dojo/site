import { tsx } from '@dojo/framework/core/vdom';
import { DNode } from '@dojo/framework/core/interfaces';

import visitor from './visitor';
import { isVNode } from '@dojo/framework/core/vdom';

describe('visitor', () => {
	it('removes undefined nodes from the response', () => {
		const input = (
			<ul>
				{undefined}
				<li>
					<a href="https://example.com/">Hard Link</a>
				</li>
				<li classes="test">
					<a href="./introduction">Introduction</a>
				</li>
				<li>
					<p>
						<a href="./basic-usage">Basic Usage</a>
					</p>
				</li>
			</ul>
		);

		const parser = (node: DNode) => {
			if (isVNode(node)) {
				if (node.tag === 'li' && node.properties.classes !== 'list-item') {
					return [
						node.properties.classes === 'test' ? <div>test</div> : undefined,
						<li classes="list-item">{node.children}</li>
					];
				}
			}
		};

		const output = visitor(input, parser);

		expect(output).toEqual([
			<ul>
				<li classes="list-item">
					<a href="https://example.com/">Hard Link</a>
				</li>
				<div>test</div>
				<li classes="list-item">
					<a href="./introduction">Introduction</a>
				</li>
				<li classes="list-item">
					<p>
						<a href="./basic-usage">Basic Usage</a>
					</p>
				</li>
			</ul>
		]);
	});
});
