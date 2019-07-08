import { Repository, Content } from './interface';

/* Repositories */
export const repositories: { [key: string]: Repository } = {
	frameworkMaster: {
		name: 'dojo/framework'
	}
};

/* Content */
export const content: Content = {
	referenceGuides: [
		{
			name: 'i18n',
			description: 'i18nDescription',
			icon: 'globe',
			to: 'reference-guide-i18n',
			repository: repositories.frameworkMaster,
			path: 'docs/:locale:/i18n'
		},
		{
			name: 'stylingAndTheming',
			description: 'stylingAndThemingDescription',
			icon: 'palette',
			to: 'reference-guide-styling-and-theming',
			repository: repositories.frameworkMaster,
			path: 'docs/:locale:/styling-and-theming'
		},
		{
			name: 'routing',
			description: 'routingDescription',
			icon: 'sitemap',
			to: 'reference-guide-routing',
			repository: repositories.frameworkMaster,
			path: 'docs/:locale:/routing'
		}
	]
};
