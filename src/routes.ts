export default [
	{
		path: 'home',
		outlet: 'home',
		defaultRoute: true
	},
	{
		path: 'blog',
		outlet: 'blog'
	},
	{
		path: 'documentation',
		outlet: 'documentation',
		children: [
			{
				path: '{tutorial}',
				outlet: 'tutorial'
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
		path: 'community',
		outlet: 'community'
	}
];
