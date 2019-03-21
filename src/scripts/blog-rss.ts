import { DNode } from '@dojo/framework/widget-core/interfaces';

import { Feed } from 'feed';
import { join } from 'path';
import { outputFileSync } from 'fs-extra';

import { registerHandlers, handlers, processMarkdown } from './compile';
import { BlogFile } from './compile-blog-index.block';

const unified = require('unified');
const stringify = require('rehype-stringify');

const outputDirectory = join(__dirname, '../../output/dist');

export interface BlogEntry {
	title: string;
	author: string;
	link: string;
	image: string;
	description: string;
	content: DNode;
	date: Date;
}

export function createBlogFeed(files: BlogFile[], contentRoot: string) {
	const feed = new Feed({
		title: 'Dojo',
		description: 'The official blog of the Dojo framework',
		id: 'https://dojo.io/blog',
		link: 'https://dojo.io/blog',
		favicon: 'https://dojo.io/favicon.ico',
		copyright: 'All rights reserved 2019, SitePen',
		feedLinks: {
			atom: 'https://dojo.io/atom'
		},
		author: {
			name: 'SitePen'
		},
		feed: ''
	});

	for (const file of files) {
		const fullContentProcessed = processMarkdown(file.content, registerHandlers(handlers), false);
		const fullContent = unified()
			.use(stringify)
			.stringify(fullContentProcessed);

		const descriptionProcessed = processMarkdown(
			file.content.split('<!-- more -->')[0],
			registerHandlers(handlers),
			false
		);
		const description = unified()
			.use(stringify)
			.stringify(descriptionProcessed);

		const { title, date, author } = file.meta;
		const url = `https://dojo.io/blog/${file.file.replace('blog/en/', '').replace('.md', '')}`;
		const publishedDate = date instanceof Date ? date : new Date();
		const item = {
			title: typeof title === 'string' ? title : '',
			id: url,
			author: [{ name: typeof author === 'string' ? author : '' }],
			link: url,
			description: description,
			content: fullContent,
			date: publishedDate,
			published: publishedDate
		};

		// feed
		feed.addItem(item);
	}

	const feedOutputPath = join(outputDirectory, 'atom.xml');
	outputFileSync(feedOutputPath, feed.atom1());
}
