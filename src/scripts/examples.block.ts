import fetch from 'node-fetch';
import { VNode } from '@dojo/framework/widget-core/interfaces';
import { select } from '@dojo/framework/testing/support/selector';

import { fromMarkdown, toDNodes } from './compile';

const README_URL = 'https://raw.githubusercontent.com/dojo/examples/master/README.md';

export interface ExampleMeta {
	code: VNode;
	demo: string;
	example: VNode;
	exampleName: string;
	overview: VNode;
	sandbox?: boolean;
}

export default async function(): Promise<ExampleMeta[]> {
	const response = await fetch(README_URL);
	const text = await response.text();
	const rows = text.match(/\|.*\|/g)!.map((row) => row.trim());
	const keys = rows
		.shift()!
		.split('|')
		.map((value) => value.toLowerCase().trim())
		.filter((value) => value);
	rows.shift();

	const examples = rows.map((row) => {
		const data = row
			.split('|')
			.map((value) => value.trim())
			.filter((value) => value);
		const exampleName = data[1].replace(/((^\[Link\]\(\.\/)|(\)$))/g, '');
		const demoLink = select('a', toDNodes(fromMarkdown(data[2], {})));
		let demoUrl = '';
		if (demoLink && demoLink.length === 1) {
			demoUrl = (demoLink[0].properties as any).href;
		}

		return {
			[keys[0]]: toDNodes(fromMarkdown(data[0], {})),
			[keys[1]]: toDNodes(fromMarkdown(data[1], {})),
			[keys[2]]: demoUrl,
			[keys[3]]: data.length === keys.length,
			[keys[4]]: toDNodes(fromMarkdown(data.length === keys.length ? data[4] : data[3], {})),
			exampleName
		};
	});
	return (examples as any) as ExampleMeta[];
}
