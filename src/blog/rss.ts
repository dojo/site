import { DNode } from '@dojo/framework/core/interfaces';

import { Feed } from 'feed';
import { join } from 'path';
import { outputFileSync } from 'fs-extra';

import markdown from '../common/markdown';
import { BlogFile } from './index.block';

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

// In order to not spam people's RSS feed when this goes live, we skip items before May 2019
const skipItemsBefore = new Date(2019, 4, 1).getTime();

export function createBlogFeed(files: BlogFile[], languageFolder: string) {
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

	for (let file of files) {
		const { title, date, author } = file.meta;
		const publishedDate = date instanceof Date ? date : new Date();

		if (publishedDate.getTime() < skipItemsBefore) {
			continue;
		}

		const fullContent = markdown(file.content, true, 'string') as string;
		const description = markdown(file.content.split('<!-- more -->')[0], true, 'string') as string;

		const url = `https://dojo.io/blog/${file.file.replace(`blog/${languageFolder}/`, '').replace('.md', '')}`;
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
