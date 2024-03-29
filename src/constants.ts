import { Guide } from './interfaces';

export const IS_LATEST = false;
export const VERSION_BRANCH: string = 'master';
export const OTHER_VERSIONS: string[] = ['v7', 'v6', 'v5'];

export const GUIDES_DEFAULT_REPO = 'dojo/framework';
export const GUIDES_DEFAULT_BRANCH = VERSION_BRANCH;
export const GUIDES: Guide[] = [
	{ name: 'Overview' },
	{ name: 'Creating Widgets' },
	{ name: 'Middleware' },
	{ name: 'Building' },
	{ name: 'I18n' },
	{ name: 'Styling' },
	{ name: 'Stores' },
	{ name: 'Resources' },
	{ name: 'Routing' },
	{ name: 'Testing' },
	{ name: 'Custom Elements' }
];

export const EXAMPLES_REPO = 'dojo/examples';
export const EXAMPLES_BRANCH = VERSION_BRANCH;

export const WIDGETS_DEFAULT_BRANCH = VERSION_BRANCH;
