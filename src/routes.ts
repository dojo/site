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
		]
	},
	{
		path: 'playground',
		outlet: 'playground',
		id: 'playground'
	},
	{
		path: 'playground/{example}/{type}',
		id: 'playground-example',
		outlet: 'playground-example',
		defaultParams: {
			type: 'demo'
		}
	},
	{
		id: 'roadmap',
		path: 'roadmap',
		outlet: 'roadmap'
	},
	{
		id: 'community',
		path: 'community',
		outlet: 'community'
	},
	{
		id: 'learn',
		path: 'learn',
		outlet: 'learn'
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
