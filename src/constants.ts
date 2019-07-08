import { Version } from './interface';

/* Outlets */
export const outlets = {
	home: 'home',
	blog: {
		home: 'blog',
		post: 'blog-post'
	},
	examples: 'examples',
	playground: 'playground',
	roadmap: 'roadmap',
	community: 'community',
	referenceGuides: 'reference-guides'
};

/* Versions */
export const currentVersion: Version = {
	name: '6.0.0',
	shortName: 'v6',
	current: true,
	tag: 'stable'
};

export const versions: Version[] = [currentVersion];
