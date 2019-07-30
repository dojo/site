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
		path: 'examples',
		outlet: 'examples'
	},
	{
		path: 'playground',
		outlet: 'playground'
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
		path: 'learn/{guide}/{page}',
		outlet: 'learn',
		defaultParams: {
			guide: 'overview',
			page: 'introduction'
		}
	}
];
