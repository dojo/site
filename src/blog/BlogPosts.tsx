import { tsx, create } from '@dojo/framework/core/vdom';
import Route from '@dojo/framework/routing/Route';

import BlogPost from './BlogPost';

const factory = create();

export default factory(function BlogPosts() {
	return (
		<Route
			key="blog-post"
			id="blog-post"
			renderer={(matchDetails) => {
				const path = `blog/en/${matchDetails.params.path}.md`;
				const url = matchDetails.router.link('blog-post', matchDetails.router.currentParams);
				return <BlogPost url={url} path={path} standalone />;
			}}
		/>
	);
});
