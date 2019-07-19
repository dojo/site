import { tsx, create } from '@dojo/framework/core/vdom';
import Outlet from '@dojo/framework/routing/Outlet';

import BlogPost from './BlogPost';

const factory = create();

export default factory(function BlogPosts() {
	return (
		<Outlet
			key="blog-post"
			id="blog-post"
			renderer={(matchDetails) => {
				const path = `blog/en/${matchDetails.params.path}.md`;
				return <BlogPost path={path} standalone />;
			}}
		/>
	);
});
