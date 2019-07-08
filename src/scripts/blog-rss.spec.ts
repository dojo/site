import * as fs from 'fs-extra';
import * as path from 'path';
import { Feed } from 'feed';
import { advanceTo, clear } from 'jest-date-mock';

import { createBlogFeed } from './blog-rss';
import { BlogPost } from './compile-blog-post.block';

jest.mock('fs');
jest.mock('fs-extra');

describe('Blog RSS', () => {
	let outputFileSyncMock: jest.SpyInstance;

	const blog1: BlogPost = {
		sortDate: new Date(2019, 6, 1),
		meta: {
			title: 'Announcing Version 6 of Dojo',
			date: new Date(2019, 6, 1),
			author: 'Anthony Gubler'
		},
		file: 'blog/en/version-6-dojo.md',
		content: false,
		rawContent: `
---
title: Announcing Dojo 6.0.0
date: 2019-06-01T00:00:00.000Z
author: Anthony Gubler
---

## Dojo version 6 has arrived!

We're excited to announce the 6.0.0 release of Dojo. Yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda.

![Announcing Dojo 5.0.0](/assets/blog/version-5-dojo/featured.png)
<!-- more -->

### New Features

Yadda yadda yadda yadda yadda yadda yadda yadda.
      `
	};

	const blog2: BlogPost = {
		sortDate: new Date('2018-10-15 12:00:00'),
		meta: {
			title: 'Announcing Version 4 of Dojo',
			date: new Date('2018-10-15 12:00:00'),
			author: 'Paul Shannon'
		},
		file: 'blog/en/version-4-dojo.md',
		content: false,
		rawContent: `
---
title: Announcing Version 4 of Dojo
date: 2018-10-15T12:00:00.000Z
author: Paul Shannon
---
## Being a Better Dojo

Developer ergonomics, efficient source code, consistent and flexible architecture, interoperability and alignment with modern standards, and strong community support are fundamental reasons for choosing a framework. We’re constantly looking for ways to improve Dojo and provide the community with the best possible modern framework.

![Announcing Version 4 of Dojo](/assets/blog/version-4-dojo/featured.png)
<!-- more -->

## Dojo CLI Tooling

The main focus of version 4 of Dojo is improving application optimization and analyzing, focusing on tooling that can enable these features by default. Separating a Dojo application into bundles (often referred to as code splitting) has been possible since the initial Dojo release. Although this did not require you to change your source code, it did require adding some configuration to specify how your application should be bundled. We wanted to do better by default and in version 4, the [Dojo build tooling will automatically split an application based on its top-level routes](https://github.com/dojo/cli-build-app#code-splitting-by-route)!

The application template used by \`cli-build-app\` provides this functionality out of the box. In addition to this a bundle analyzer is automatically generated when running a build in production mode, providing even more insight into you bundles.
      `
	};

	const blog3: BlogPost = {
		sortDate: new Date(),
		meta: {},
		file: 'blog/en/no-meta-blog.md',
		content: false,
		rawContent: '## A blog without any meta'
	};

	beforeEach(() => {
		jest.resetAllMocks();

		outputFileSyncMock = jest.spyOn(fs, 'outputFileSync').mockImplementation(() => {});
		jest.spyOn(path, 'join').mockImplementation(() => 'path/to/some/atom.xml');

		advanceTo(new Date(2019, 5, 13, 0, 0, 0)); // reset to date time.
	});

	afterEach(() => {
		clear();
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});

	it('should render blog rss feed', () => {
		createBlogFeed([blog1, blog2, blog3]);

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

		const item = {
			title: 'Announcing Version 6 of Dojo',
			id: 'https://dojo.io/blog/version-6-dojo',
			author: [{ name: 'Anthony Gubler' }],
			link: 'https://dojo.io/blog/version-6-dojo',
			description: `<h2>Dojo version 6 has arrived!</h2>
<p>We're excited to announce the 6.0.0 release of Dojo. Yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda.</p>
<p><img src="/assets/blog/version-5-dojo/featured.png" alt="Announcing Dojo 5.0.0"></p>`,
			content: `<h2>Dojo version 6 has arrived!</h2>
<p>We're excited to announce the 6.0.0 release of Dojo. Yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda.</p>
<p><img src="/assets/blog/version-5-dojo/featured.png" alt="Announcing Dojo 5.0.0"></p>
<h3>New Features</h3>
<p>Yadda yadda yadda yadda yadda yadda yadda yadda.
</p>`,
			date: new Date(2019, 6, 1),
			published: new Date(2019, 6, 1)
		};

		// feed
		feed.addItem(item);

		const item3 = {
			title: '',
			id: 'https://dojo.io/blog/no-meta-blog',
			author: [{ name: '' }],
			link: 'https://dojo.io/blog/no-meta-blog',
			description: `<h2>A blog without any meta</h2>`,
			content: `<h2>A blog without any meta</h2>`,
			date: new Date(),
			published: new Date()
		};

		// feed
		feed.addItem(item3);

		expect(outputFileSyncMock).toBeCalledWith('path/to/some/atom.xml', feed.atom1());
	});
});
