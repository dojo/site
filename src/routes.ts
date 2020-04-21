import { RouteConfig } from '@dojo/framework/routing/interfaces';

export default [
	{
		path: 'home',
		outlet: 'home',
		id: 'home',
		defaultRoute: true
	},
	{
		path: 'blog',
		id: 'blog',
		outlet: 'blog',
		children: [
			{
				path: '{path}',
				outlet: 'blog-post',
				id: 'blog-post'
			}
		],
		title: 'Dojo Blog'
	},
	{
		path: 'playground',
		outlet: 'playground',
		id: 'playground',
		title: 'Dojo Playground'
	},
	{
		path: 'playground/{example}/{type}',
		id: 'playground-example',
		outlet: 'playground-example',
		defaultParams: {
			type: 'demo'
		},
		title: 'Dojo Playground'
	},
	{
		id: 'roadmap',
		path: 'roadmap',
		outlet: 'roadmap',
		title: 'Dojo Roadmap'
	},
	{
		id: 'community',
		path: 'community',
		outlet: 'community',
		title: 'Dojo Community'
	},
	{
		id: 'learn',
		path: 'learn',
		outlet: 'learn',
		title: 'Dojo Learn'
	},
	{
		id: 'learn',
		path: 'learn/{guide}',
		outlet: 'learn',
		defaultParams: {
			guide: 'overview'
		}
	},
	{
		id: 'learn',
		path: 'learn/{guide}/{page}',
		outlet: 'learn',
		defaultParams: {
			guide: 'overview',
			page: 'introduction'
		}
	}
] as RouteConfig[];
