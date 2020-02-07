import { RouteConfig } from '@dojo/framework/routing/interfaces';

export default [
	{
		path: 'home',
		outlet: 'home',
		defaultRoute: true
	},
	{
		path: 'blog',
		outlet: 'blog',
		children: [
			{
				path: '{path}',
				outlet: 'blog-post'
			}
		]
	},
	{
		path: 'playground/{example}',
		outlet: 'playground',
		defaultParams: {
			example: 'sandbox'
		}
	},
	{
		path: 'roadmap',
		outlet: 'roadmap'
	},
	{
		path: 'community',
		outlet: 'community'
	},
	{
		path: 'learn',
		outlet: 'learn'
	},
	{
		path: 'learn/{guide}',
		outlet: 'learn',
		defaultParams: {
			guide: 'overview'
		}
	},
	{
		path: 'learn/{guide}/{page}',
		outlet: 'learn',
		defaultParams: {
			guide: 'overview',
			page: 'introduction'
		}
	}
] as RouteConfig[];
