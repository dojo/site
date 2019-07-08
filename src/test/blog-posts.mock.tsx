import { BlogPost } from '../scripts/compile-blog-post.block';
import { tsx, v } from '@dojo/framework/core/vdom';
import { advanceTo, clear } from 'jest-date-mock';

advanceTo(new Date(2019, 5, 13, 0, 0, 0)); // reset to date time.

export const fileList = ['version-4-dojo.md', 'version-6-dojo.md', 'file3.md', 'no-meta-blog.md'];
export const filePathList = [
	'blog/en/version-4-dojo.md',
	'blog/en/version-6-dojo.md',
	'blog/en/file3.md',
	'blog/en/no-meta-blog.md'
];

export const file1 = `
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
`;

export const blogPost1Excerpt: BlogPost = {
	file: 'blog/en/version-4-dojo.md',
	rawContent: `
---
title: Announcing Version 4 of Dojo
date: 2018-10-15T12:00:00.000Z
author: Paul Shannon
---
## Being a Better Dojo

Developer ergonomics, efficient source code, consistent and flexible architecture, interoperability and alignment with modern standards, and strong community support are fundamental reasons for choosing a framework. We’re constantly looking for ways to improve Dojo and provide the community with the best possible modern framework.

![Announcing Version 4 of Dojo](/assets/blog/version-4-dojo/featured.png)
`,
	sortDate: new Date('2018-10-15T12:00:00.000Z'),
	meta: {
		title: 'Announcing Version 4 of Dojo',
		date: new Date('2018-10-15T12:00:00.000Z'),
		author: 'Paul Shannon'
	},
	content: v('div', { key: 'compiledKey' }, [
		v('h2', { key: 'compiledKey' }, ['Being a Better Dojo']),
		`
`,
		v('p', { key: 'compiledKey' }, [
			'Developer ergonomics, efficient source code, consistent and flexible architecture, interoperability and alignment with modern standards, and strong community support are fundamental reasons for choosing a framework. We’re constantly looking for ways to improve Dojo and provide the community with the best possible modern framework.'
		]),
		`
`,
		v('p', { key: 'compiledKey' }, [
			v(
				'img',
				{
					key: 'compiledKey',
					src: '/assets/blog/version-4-dojo/featured.png',
					alt: 'Announcing Version 4 of Dojo'
				},
				undefined
			)
		])
	])
};

export const file2 = `
---
title: Announcing Version 6 of Dojo
date: 2019-06-01T00:00:00.000Z
author: Anthony Gubler
---

## Dojo version 6 has arrived!

We're excited to announce the 6.0.0 release of Dojo. Yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda.

![Announcing Dojo 5.0.0](/assets/blog/version-5-dojo/featured.png)
<!-- more -->

### New Features

Yadda yadda yadda yadda yadda yadda yadda yadda.
`;

export const blogPost2Excerpt: BlogPost = {
	file: 'blog/en/version-6-dojo.md',
	rawContent: `
---
title: Announcing Version 6 of Dojo
date: 2019-06-01T00:00:00.000Z
author: Anthony Gubler
---

## Dojo version 6 has arrived!

We're excited to announce the 6.0.0 release of Dojo. Yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda.

![Announcing Dojo 5.0.0](/assets/blog/version-5-dojo/featured.png)
`,
	sortDate: new Date('2019-06-01T00:00:00.000Z'),
	meta: {
		title: 'Announcing Version 6 of Dojo',
		date: new Date('2019-06-01T00:00:00.000Z'),
		author: 'Anthony Gubler'
	},
	content: v('div', { key: 'compiledKey' }, [
		v('h2', { key: 'compiledKey' }, ['Dojo version 6 has arrived!']),
		`
`,
		v('p', { key: 'compiledKey' }, [
			"We're excited to announce the 6.0.0 release of Dojo. Yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda."
		]),
		`
`,
		v('p', { key: 'compiledKey' }, [
			v(
				'img',
				{ key: 'compiledKey', src: '/assets/blog/version-5-dojo/featured.png', alt: 'Announcing Dojo 5.0.0' },
				undefined
			)
		])
	])
};

export const blogPost2Full: BlogPost = {
	file: 'blog/en/version-6-dojo.md',
	rawContent: file2,
	sortDate: new Date('2019-06-01T00:00:00.000Z'),
	meta: {
		title: 'Announcing Version 6 of Dojo',
		date: new Date('2019-06-01T00:00:00.000Z'),
		author: 'Anthony Gubler'
	},
	content: v('div', { key: 'compiledKey' }, [
		v('h2', { key: 'compiledKey' }, ['Dojo version 6 has arrived!']),
		`
`,
		v('p', { key: 'compiledKey' }, [
			"We're excited to announce the 6.0.0 release of Dojo. Yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda yadda."
		]),
		`
`,
		v('p', { key: 'compiledKey' }, [
			v(
				'img',
				{ key: 'compiledKey', src: '/assets/blog/version-5-dojo/featured.png', alt: 'Announcing Dojo 5.0.0' },
				undefined
			)
		]),
		`
`,
		v('h3', { key: 'compiledKey' }, ['New Features']),
		`
`,
		v('p', { key: 'compiledKey' }, ['Yadda yadda yadda yadda yadda yadda yadda yadda.'])
	])
};

export const file3 = `
---
title: Blog Title 3
date: 2017-01-05 08:00:00Z
author: Paul Shannon
---
## Blog Title 3
`;

export const blogPost3: BlogPost = {
	file: 'blog/en/file3.md',
	rawContent: file3,
	sortDate: new Date('2017-01-05 08:00:00Z'),
	meta: {
		title: 'Blog Title 3',
		date: new Date('2017-01-05 08:00:00Z'),
		author: 'Paul Shannon'
	},
	content: <h2 key="compiledKey">Blog Title 3</h2>
};

export const file4 = `\
## A blog without any meta
`;

export const blogPost4: BlogPost = {
	file: 'blog/en/no-meta-blog.md',
	rawContent: file4,
	sortDate: new Date(),
	meta: {},
	content: <h2 key="compiledKey">A blog without any meta</h2>
};

clear();
