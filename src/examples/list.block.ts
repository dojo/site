import fetch from 'node-fetch';
import { VNode } from '@dojo/framework/core/interfaces';
import { select } from '@dojo/framework/testing/support/selector';

import markdown from '../common/markdown';

export interface ExampleMeta {
	code: VNode;
	demo: string;
	example: VNode;
	exampleName: string;
	overview: VNode;
	sandbox?: boolean;
}

interface ExampleOptions {
	branch: string;
}

export default async function({ branch }: ExampleOptions): Promise<ExampleMeta[]> {
	const response = await fetch(`https://raw.githubusercontent.com/dojo/examples/${branch}/README.md`);
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
		const demoLink = select('a', markdown(data[2]));
		let demoUrl = '';
		if (demoLink && demoLink.length === 1) {
			demoUrl = (demoLink[0].properties as any).href;
		}

		return {
			[keys[0]]: markdown(data[0]),
			[keys[1]]: markdown(data[1]),
			[keys[2]]: demoUrl,
			[keys[3]]: data.length === keys.length,
			[keys[4]]: markdown(data.length === keys.length ? data[4] : data[3]),
			exampleName
		};
	});
	return (examples as any) as ExampleMeta[];
}
