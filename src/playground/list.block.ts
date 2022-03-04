import fetch from 'node-fetch';
import { VNode } from '@dojo/framework/core/interfaces';

import { EXAMPLES_REPO } from '../constants';
import markdown from '../common/markdown';

export interface ExampleMeta {
	code: VNode;
	demo: string;
	example: VNode;
	exampleName: string;
	overview: VNode;
	sandbox?: boolean;
}

export default async function(examplesBranch: string, isLatest: boolean): Promise<ExampleMeta[]> {
	const response = await fetch(`https://raw.githubusercontent.com/${EXAMPLES_REPO}/${examplesBranch}/README.md`);
	const text = await response.text();
	const rows = text.match(/\|.*\|/g)!.map((row) => row.trim());
	const keys = rows
		.shift()!
		.split('|')
		.map((value) => value.toLowerCase().trim())
		.filter((value) => value);
	rows.shift();

	let prefix = '';
	if (examplesBranch === 'master') {
		prefix = 'next.';
	} else if (!isLatest) {
		prefix = `${examplesBranch}.`;
	}

	const examplesDemoUrl = `https://${prefix}examples.dojo.io/`;

	const examples = rows.map((row) => {
		const data = row
			.split('|')
			.map((value) => value.trim())
			.filter((value) => value);
		const exampleName = data[1].replace(/((^\[Link\]\(\.\/packages\/)|(\)$))/g, '');

		return {
			[keys[0]]: markdown(data[0]),
			[keys[1]]: markdown(data[1]),
			[keys[2]]: `${examplesDemoUrl}${exampleName}`,
			[keys[3]]: data.length === keys.length,
			[keys[4]]: markdown(data.length === keys.length ? data[4] : data[3]),
			exampleName
		};
	});
	return (examples as any) as ExampleMeta[];
}
